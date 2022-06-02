<?php
namespace App\Http\Controllers\Applicant\Auth;

use App\Core\Exception\Models\ExceptionModel;

use App\Core\Utilities\Authentication\ApplicantAuthUtility;
use App\Core\Utilities\Authentication\OneTimePassword as OTP;
use App\Core\Utilities\Communication\ShortMessagingService as SmsUtility;
use App\Core\Utilities\Http\ClientRequestFootprint;
use App\Core\Utilities\Authentication\JsonWebToken as Jwt;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\Auth\Register\OtpVerificationRequest;
use App\Http\Requests\Applicant\Auth\Register\ParameterCheckRequest;
use App\Http\Requests\Applicant\Auth\Register\RegistrationRequest;

use App\Models\Applicant\User as ApplicantUser;
use App\Models\Applicant\UserVerification;
use App\Models\Applicant\User\SessionTokens as ApplicantSessionTokens;
use App\Models\MFACommunicationChannel;
use App\Models\OTP as ModelsOTP;

use App\Trait\ContactChannelFormatTrait;
use Carbon\Carbon;

/**
 * Registration
 * @package App\Http\Controllers\Applicant\Auth
 */
class Registration extends Controller {
    use ContactChannelFormatTrait;

    /**
     * Resend Intervals
     */
    protected $sms_resend_interval = array();
    protected $email_resend_interval = array();

    /**
     * Send Activation Code via SMS
     * 
     * @param string $recipient
     * @param string $code
     * 
     * @return void
     */
    private function SendActivationCodeViaSMS(string $recipient, string $code) : void 
    {
        $body = str_replace(':otp', $code, env('SMS_API_Tpl_RegistrationSMSVerify'));

        $sms = (new SmsUtility())
        ->body($body)
        ->sender('SMS_API_SenderID_1')
        ->recipient($recipient)
        ->build();
    }

    /**
     * Send Activation Code via Email 
     * 
     * @param string $email
     * @param string $name
     * @param array $merge
     * 
     * @return void
     */
    private function SendActivationCodeViaEmail(string $email, string $name, array $merge) : void 
    {
        $merge['AppName'] = env('APP_NAME');
        $connect = Http::bodyFormat('json')->withHeaders([
            'Authorization' => env('ZM_API_AuthKey')
        ])->post(env('ZM_API_TEMPLATE_BASEURL'), [
            "mail_template_key" => env('ZM_API_Tpl_RegistrationEmailVerify'),
            "bounce_address" => env('ZM_API_BounceAddress'),
            "from" => [
                "address" => 'verify-noreply' . '@' . env('ZM_API_BaseDomain'),
                "name" => "BFP ECS"
            ],
            "to" => [
                [
                    "email_address" => [
                        "address" => $email,
                        "name" => $name
                    ]
                ]
            ],
            "merge_info" => $merge
        ]);
    }
    
    /**
     * Registration
     * 
     * @param RegistrationRequest $req
     * 
     * @return mixed
     */
    public function Register(RegistrationRequest $req) {
        try {
            // Make a password hash
            $hashed_password = Hash::make($req->input('password'));

            // Store User in the Database
            try {
                //Insert user in database
                $create = ApplicantUser::query()->create([
                    'username' => $req->input('username'),
                    'password' => $hashed_password,
                    'mobilenumber' => $req->input('mobilenumber'),
                    'emailaddress' => $req->input('emailaddress'),
                    'salutation' => $req->input('salutation'),
                    'firstname' => $req->input('firstname'),
                    'middlename' => $req->input('middlename'),
                    'lastname' => $req->input('lastname'),
                    'is_active' => true,
                    'is_emailaddress_verified' => false,
                    'is_mobilenumber_verified' => false,
                    'is_mfa_enabled' => false
                ]);
            } catch (\Exception $e) {
                return response()->error(400, 'Unable to save record on the database.');
                die();
            }
            

            // Generate JWT
            $token = (new Jwt())
            ->issuer('ECS Registration')
            ->subject($create->id)
            ->payload(['id' => $create->id])
            ->expire(env('REGISTRATION_OTP_EXPIRY')) // Use the same OTP expiry duration
            ->Create();

            // Store JWT in DB
            $store_jwt = (new ApplicantSessionTokens())->store(
                $token->jti,
                $token->token,
                $create->id,
                (new ClientRequestFootprint($req))->footprint,
                false,
                Carbon::createFromTimestamp($token->expires_in)->toDateTimeString()
            );
            
            // Send Activation Code via SMS
            try {
                // Create OTP
                $create_sms_otp = (new OTP())->Create(1)->get;

                // Store verification code
                $store_db = UserVerification::query()->updateOrCreate([
                    'applicant_user_id' => $create->id,
                    'otp_id' => $create_sms_otp['id'] ?? null,
                    'mfa_communication_channel_id' => 1,
                    'is_verified' => false,
                    'expires_at' => $create_sms_otp['expires_at']
                ])->where([
                    'applicant_user_id' => $create->id,
                    'mfa_communication_channel_id' => 1 
                ]);

                // Send OTP
                $this->SendActivationCodeViaSMS($req->input('mobilenumber'), $create_sms_otp['code']);
            } catch (\Exception $e) {
                return response()->error(400, $e->getMessage());
                die();
            }

            // Send Activation Code via Email
            try {
                // Create OTP
                $create_email_otp = (new OTP())->Create(2)->get;

                // Store verification code
                $store_db = UserVerification::query()->updateOrCreate([
                    'applicant_user_id' => $create->id,
                    'otp_id' => $create_email_otp['id'] ?? null,
                    'mfa_communication_channel_id' => 2,
                    'is_verified' => false,
                    'expires_at' => $create_email_otp['expires_at']
                ])->where([
                   'applicant_user_id' => $create->id,
                   'mfa_communication_channel_id' => 2 
                ]);

                // Send OTP
                $this->SendActivationCodeViaEmail(
                    $req->input('emailaddress'),
                    strtoupper(($req->input('firstname')) . ' ' . ($req->input('middlename') ? $req->input('middlename') . ' ' : '') . ($req->input('lastname') ? $req->input('lastname') : '')),
                    [
                        'otp' => $create_email_otp['code'],
                        'csr_email' => env('CSR_EMAIL_ADDRESS')
                    ]
                );
            } catch (\Exception $e) {
                return response()->error(400, $e->getMessage());
                die();
            }

            return response()->success(
                200,
                'Registration has succeeded.',
                [
                    'access_token' => $token->token,
                    'token_type' => 'bearer',
                    'expires_in' => $token->expires_in
                ]
            );
        } catch (HttpResponseException $e) {
            return $e;
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    /**
     * Mobile phone number verification.
     * 
     * @param OtpVerificationRequest $req
     * 
     * @return mixed
     */
    public function VerifySms(OtpVerificationRequest $req) {
        try {
            // Get User Information
            $user = ApplicantAuthUtility::CurrentUser($req);

            // Get Exception Detail
            $exception = new ExceptionModel();

            // Check if Mobile Number has already been verified
            if ($user->is_mobilenumber_verified) {
                return response()->error(400, 'Validation Error', [
                    'code' => $exception->getMessageString('AT005D', [
                        'Email' => env('CSR_EMAIL_ADDRESS')
                    ])
                ]);
                die();
            }

            // Get Communication Channel
            $communicationChannel = MFACommunicationChannel::query()->where([
                'shortname' => 'sms',
                'is_active' => true
            ]);

            // Get User Verification Channel
            $userVerificationChannel = UserVerification::query()->where([
                'applicant_user_id' => $user->id,
                'mfa_communication_channel_id' => $communicationChannel->first()->id
            ]);

            if ($userVerificationChannel->count() <= 0) {
                return response()->error(400, 'User Verification Channel Error', [
                    'code' => $exception->getMessageString('AT005F')
                ]);
                die();
            }

            try {
                // Get OTP
                $otp = ModelsOTP::query()->find($userVerificationChannel->first()->otp_id);

                // Compare OTP and code.
                $compare = Hash::check($req->code, $otp->otp);

                if ($compare) {
                    // Update mobile phone verification status
                    $user->update(['is_mobilenumber_verified' => true]);
                    $userVerificationChannel->update(['is_verified' => true]);
                    
                    return response()->success(200, 'Success', [
                        'alert' => 'Mobile phone has been successfully verified.'
                    ]);
                } else {
                    return response()->error(401, 'Invalid Code', [
                        'code' => $exception->getMessageString('AT005B')
                    ]);
                    die();
                }
            } catch (ModelNotFoundException $e) {
                return response()->error(400, 'OTP Error', [
                    'code' => $exception->getMessageString('AT005G')
                ]);
                die();
            }
            
        } catch (HttpResponseException $e) {
            return $e;
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    /**
     * Email address verification
     * 
     * @param OtpVerificationRequest $req
     * 
     * @return mixed
     */
    public function VerifyEmail(OtpVerificationRequest $req) {
        try {
            // Get User Information
            $user = ApplicantAuthUtility::CurrentUser($req);

            // Get Exception Detail
            $exception = new ExceptionModel();

            // Check if Email address has already been verified
            if ($user->is_emailaddress_verified) {
                return response()->error(400, 'Validation Error', [
                    'code' => $exception->getMessageString('AT005E', [
                        'Email' => env('CSR_EMAIL_ADDRESS')
                    ])
                ]);
                die();
            }

            // Get Communication Channel
            $communicationChannel = MFACommunicationChannel::query()->where([
                'shortname' => 'email',
                'is_active' => true
            ]);

            // Get User Verification Channel
            $userVerificationChannel = UserVerification::query()->where([
                'applicant_user_id' => $user->id,
                'mfa_communication_channel_id' => $communicationChannel->first()->id
            ]);

            if ($userVerificationChannel->count() <= 0) {
                return response()->error(400, 'User Verification Channel Error', [
                    'code' => $exception->getMessageString('AT005F')
                ]);
                die();
            }

            try {
                // Get OTP
                $otp = ModelsOTP::query()->find($userVerificationChannel->first()->otp_id);

                // Compare OTP and code.
                $compare = Hash::check($req->code, $otp->otp);

                if ($compare) {
                    // Update email address verification status
                    $user->update(['is_emailaddress_verified' => true]);
                    $userVerificationChannel->update(['is_verified' => true]);
                    
                    return response()->success(200, 'Success', [
                        'alert' => 'Email address has been successfully verified.'
                    ]);
                    die();
                } else {
                    return response()->error(401, 'Invalid Code', [
                        'code' => $exception->getMessageString('AT005B')
                    ]);
                    die();
                }
            } catch (ModelNotFoundException $e) {
                return response()->error(400, 'OTP Error', [
                    'code' => $exception->getMessageString('AT005G')
                ]);
                die();
            }
            
        } catch (HttpResponseException $e) {
            return $e;
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    /**
     * Resend activation SMS
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function ResendSms(Request $req) {
        try {
            // Get User Information
            $user = ApplicantAuthUtility::CurrentUser($req);

            // Get Exception Detail
            $exception = new ExceptionModel();

            // Check if Mobile Number has already been verified
            if ($user->is_mobilenumber_verified) {
                return response()->error(400, 'Validation Error', [
                    'alert' => $exception->getMessageString('AT005D', [
                        'Email' => env('CSR_EMAIL_ADDRESS')
                    ])
                ]);
                die();
            }

            // Get Communication Channel
            $communicationChannel = MFACommunicationChannel::query()->where([
                'shortname' => 'sms',
                'is_active' => true
            ]);

            // Get User Verification Channel
            $userVerificationChannel = UserVerification::query()->where([
                'applicant_user_id' => $user->id,
                'mfa_communication_channel_id' => $communicationChannel->first()->id
            ]);

            if ($userVerificationChannel->count() <= 0) {
                return response()->error(400, 'User Verification Channel Error', [
                    'alert' => $exception->getMessageString('AT005F')
                ]);
                die();
            }

            // Check if Verification Channel has already been verified
            if ($userVerificationChannel->first()->is_verified) {
                return response()->error(400, 'Validation Error', [
                    'alert' => $exception->getMessageString('AT005D', [
                        'Email' => env('CSR_EMAIL_ADDRESS')
                    ])
                ]);
                die();
            }

            /**
             * Set limit to when a user can request for resend of activation code. 
             * If there will be a normal technical SMS delay on the SMS gateway provider side,
             * the user will not repeatitively request for new code.
             */
            if ($this->GetSmsResendInterval($user->id) >= 1) {
                return response()->error(400, 'OTP Error', [
                    'alert' => $exception->getMessageString('AT005H', [
                        'SecondsAgo' => $this->sms_resend_interval['difference'],
                        'SecondsDelay' => $this->sms_resend_interval['delay']
                    ])
                ]);
                die();
            }

            // Create OTP
            $create_sms_otp = (new OTP())->Create(1)->get;

            // Update OTP in Verification Channel
            $userVerificationChannel->update([
                'otp_id' => $create_sms_otp['id']
            ]);

            // Send OTP
            $this->SendActivationCodeViaSMS($user->mobilenumber, $create_sms_otp['code']);

            // Get New Interval
            $newInterval = $this->GetSmsResendInterval($user->id);

            return response()->success(200, 'Success', [
                'alert' => 'Verification code has been successfully sent.',
                'resend_interval' => $this->sms_resend_interval
            ]);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
    
    /**
     * Resend Email
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function ResendEmail(Request $req) {
        try {
            // Get User Information
            $user = ApplicantAuthUtility::CurrentUser($req);

            // Get Exception Detail
            $exception = new ExceptionModel();

            // Check if Mobile Number has already been verified
            if ($user->is_emailaddress_verified) {
                return response()->error(400, 'Validation Error', [
                    'alert' => $exception->getMessageString('AT005D', [
                        'Email' => env('CSR_EMAIL_ADDRESS')
                    ])
                ]);
                die();
            }

            // Get Communication Channel
            $communicationChannel = MFACommunicationChannel::query()->where([
                'shortname' => 'email',
                'is_active' => true
            ]);

            // Get User Verification Channel
            $userVerificationChannel = UserVerification::query()->where([
                'applicant_user_id' => $user->id,
                'mfa_communication_channel_id' => $communicationChannel->first()->id
            ]);

            if ($userVerificationChannel->count() <= 0) {
                return response()->error(400, 'User Verification Channel Error', [
                    'alert' => $exception->getMessageString('AT005F')
                ]);
                die();
            }

            // Check if Verification Channel has already been verified
            if ($userVerificationChannel->first()->is_verified) {
                return response()->error(400, 'Validation Error', [
                    'alert' => $exception->getMessageString('AT005D', [
                        'Email' => env('CSR_EMAIL_ADDRESS')
                    ])
                ]);
                die();
            }

            /**
             * Set limit to when a user can request for resend of activation code. 
             * If there will be a normal technical SMS delay on the SMS gateway provider side,
             * the user will not repeatitively request for new code.
             */
            if ($this->GetEmailResendInterval($user->id) >= 1) {
                return response()->error(400, 'OTP Error', [
                    'alert' => $exception->getMessageString('AT005H', [
                        'SecondsAgo' => $this->email_resend_interval['difference'],
                        'SecondsDelay' => $this->email_resend_interval['delay']
                    ])
                ]);
                die();
            }
            

            // Create OTP
            $create_email_otp = (new OTP())->Create(2)->get;

            // Update OTP in Verification Channel
            $userVerificationChannel->update([
                'otp_id' => $create_email_otp['id']
            ]);

            // Send OTP
            $this->SendActivationCodeViaEmail(
                $user->emailaddress,
                strtoupper(($user->firstname) . ' ' . ($user->middlename ? $user->middlename . ' ' : '') . ($user->lastname ? $user->lastname : '')),
                [
                    'otp' => $create_email_otp['code'],
                    'csr_email' => env('CSR_EMAIL_ADDRESS')
                ]
            );

            return response()->success(200, 'Success', [
                'alert' => 'Verification code has been successfully sent.',
                'resend_interval' => $this->email_resend_interval
            ]);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    /**
     * Check if token was issued during Registration process
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function IsTokenRegistration(Request $req) {
        try {
            $token = (new Jwt())->parse($req);

            // Check if token has been manually revoked
            $iss = $token['iss'] ?? null;

            return response()->success(200, 'Success', [
                'valid' => ($iss == "ECS Registration" ? true : false)
            ]);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    /**
     * Get SMS Resend Interval
     * 
     * @param int $userid
     * 
     * @return int
     */
    protected function GetSmsResendInterval(int $userid) : int {
        // Value
        $value = (int) 0;

        // Get Communication Channel
        $communicationChannel = MFACommunicationChannel::query()->where([
            'shortname' => 'sms',
            'is_active' => true
        ]);

        // Get User Verification Channel
        $userVerificationChannel = UserVerification::query()->where([
            'applicant_user_id' => $userid,
            'mfa_communication_channel_id' => $communicationChannel->first()->id
        ]);

        /**
         * Set limit to when a user can request for resend of activation code. 
         * If there will be a normal technical SMS delay on the SMS gateway provider side,
         * the user will not repeatitively request for new code.
         */
        try {
            // Get OTP
            $otp = ModelsOTP::query()->find($userVerificationChannel->first()->otp_id);

            // Get TS difference
            $tsDifference = Carbon::now()->timestamp - $otp->created_at->timestamp;

            // Resend delay
            if (env('OTP_SMS_RESEND_DELAY_ENABLE')) {
                if ($tsDifference <= env('OTP_SMS_RESEND_DELAY')) {
                    $value = env('OTP_SMS_RESEND_DELAY') - intval($tsDifference);
                } else {
                    $value = 0;
                }
            }
            
        } catch (ModelNotFoundException $e) {
            $value = 0;
        }

        $this->sms_resend_interval['difference'] = intval($tsDifference) ?? 0;
        $this->sms_resend_interval['delay'] = $value;

        return (int) $value;
    }

    /**
     * Get Email Resend Interval
     * 
     * @param int $userid
     * 
     * @return int
     */
    protected function GetEmailResendInterval(int $userid) : int {
        $value = (int) 0;

        // Get Communication Channel
        $communicationChannel = MFACommunicationChannel::query()->where([
            'shortname' => 'email',
            'is_active' => true
        ]);

        // Get User Verification Channel
        $userVerificationChannel = UserVerification::query()->where([
            'applicant_user_id' => $userid,
            'mfa_communication_channel_id' => $communicationChannel->first()->id
        ]);

        /**
         * Set limit to when a user can request for resend of activation code. 
         * If there will be a normal technical email delay on the Email gateway provider side,
         * the user will not repeatitively request for new code.
         */
        try {
            // Get OTP
            $otp = ModelsOTP::query()->find($userVerificationChannel->first()->otp_id);

            // Get TS difference
            $tsDifference = Carbon::now()->timestamp - $otp->created_at->timestamp;

            // Resend delay
            if (env('OTP_EMAIL_RESEND_DELAY_ENABLE')) {
                if ($tsDifference <= env('OTP_EMAIL_RESEND_DELAY')) {
                    $value = env('OTP_EMAIL_RESEND_DELAY') - intval($tsDifference);
                } else {
                    $value = 0;
                }
            }
            
        } catch (ModelNotFoundException $e) {
            $value = 0;
        }

        $this->email_resend_interval['difference'] = $tsDifference ?? 0;
        $this->email_resend_interval['delay'] = $value;
        return (int) $value;
    }

    /**
     * Check verification statuses of mobile number and email address
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function CheckVerificationStatus(Request $req) {
        try {
            $user = ApplicantAuthUtility::CurrentUser($req);

            if (!$user) {
                return response()->error(400, 'An error has occured');
                die();
            }

            return response()->success(200, 'Success', [
                'emailaddress' => [
                    'verified' => $user->is_emailaddress_verified,
                    'resend_interval' => $this->GetEmailResendInterval($user->id)
                ],
                'mobilenumber' => [
                    'verified' => $user->is_mobilenumber_verified,
                    'resend_interval' => $this->GetSmsResendInterval($user->id)
                ]
            ]);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    /**
     * Parameter Check
     * 
     * @param ParameterCheckRequest $req
     * 
     * @return mixed
     */
    public function ParameterCheck(ParameterCheckRequest $req) {
        try {
            return response()->success(200, 'Parameter Check Success');
        } catch (HttpResponseException $e) {
            return $e;
        } catch (\Exception $e) {
            return response()->error(400, $e->getMessage());
        }
    }
}