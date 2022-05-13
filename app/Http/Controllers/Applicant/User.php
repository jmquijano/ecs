<?php 
namespace App\Http\Controllers\Applicant;

use App\Core\Exception\Models\ExceptionModel;
use App\Core\Utilities\Authentication\ApplicantAuthUtility;
use App\Core\Utilities\Authentication\OneTimePassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\User\ChangeEmailConfirmRequest;
use App\Http\Requests\Applicant\User\ChangeEmailRequest;
use App\Http\Requests\Applicant\User\ChangeMobileNumberConfirmRequest;
use App\Http\Requests\Applicant\User\ChangeMobileNumberRequest;
use App\Http\Requests\Applicant\User\ChangePasswordRequest;
use App\Http\Requests\Applicant\User\EditBasicProfileRequest;
use App\Models\Applicant\Config as ApplicantConfig;
use App\Models\Applicant\User as ApplicantUser;
use App\Models\Applicant\User\ChangeEmailConfirmation;
use App\Models\Applicant\User\ChangeMobileNumberConfirmation;
use App\Models\Applicant\User\ChangePasswordLog;
use App\Models\CommunicationTemplates;
use App\Models\OTP;
use App\Models\OTP\Requests as OtpRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\MFACommunicationChannel;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class User extends Controller {
    /**
     * Get Profile
     * 
     * @param Request $req
     * @param int $id
     * @return response()
     */
    public function GetProfile(Request $req, int $id) {
        try {
            // Get User Info
            $user = ApplicantUser::query()->find($id);

            if ($user == null) {
                return response()->error('404', 'User not found.');
                die();
            }

            // Check Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id;
            if ($user->id !== $currentUser) {
                return response()->error('403', 'You do not have enought privilege to view user profile.');
                die();
            }

            return response()->success(
                200,
                'User profile has been successfully retrieved.',
                $user->makeHidden(['password'])
            );
        } catch (\Exception $e) {
            return response()->error(500, 'An internal server error has occured while fetching user profile.');
        }
    }

    protected function otpGenerationFlow(
        $mfa_communication_channel,
        $currentUser,
        $otp_request,
        $template_id
    ) {
        $otp_utility = new OneTimePassword();

        $generate_otp = $otp_utility->Create($mfa_communication_channel, 900);

        // Send OTP
        $send_otp = $otp_utility->sendOtp(
            $mfa_communication_channel,
            $template_id,
            $currentUser,
            $generate_otp
        );

        // Update OTP Request
        $otp_request->update([
            'otp' => $generate_otp->get['id'] ?? null
        ]);
    }
    
    /**
     * Change Password
     */
    public function changePassword(ChangePasswordRequest $req) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // Initialize ApplicantConfig
            $config = new ApplicantConfig();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);

            $user = ApplicantUser::query()->find($currentUser->id);

            // Check Current Password match
            $checkPasswordHash = Hash::check($req->currentpassword, $user->password);
            if (!$checkPasswordHash) {
                return response()->error(
                    400,
                    'Invalid Current Password',
                    [
                        'currentpassword' => [$exception->getMessageString('UA001B')]
                    ]
                );
                die();
            }

            // Password Recycling
            if ($config->get('prohibitpasswordrecycling:enabled')) {
                // Get all password history
                $getChangePasswordHistory = ChangePasswordLog::query()->where(
                    [
                        'applicant_user_id' => $currentUser->id
                    ]
                )->pluck('password')->toArray();
                
                // Include the current password
                $getChangePasswordHistory[] = $currentUser->password;

                // Is there any match
                $matchedPassword = array();
                foreach ($getChangePasswordHistory as $changeLog) {
                    $matchedPassword[] = (bool) Hash::check($req->newpassword, $changeLog);
                }

                if (in_array(true, $matchedPassword)) {
                    return response()->error(
                        400,
                        'Password Recycling Error',
                        [
                            'newpassword' => [$exception->getMessageString("UA001D")]
                        ]
                    );
                    die();
                }
            }

            // Store Old Password
            $storeOldPassword = ChangePasswordLog::query()->create([
                'applicant_user_id' => $currentUser->id,
                'password' => $user->password
            ]);

            // Update User
            $user->update([
                'password' => Hash::make($req->newpassword),
                'last_password_change' => Carbon::now()
            ]);
            
            return response()->success(200, 'Password has been updated successfully.');

            
        } catch (\Exception $e) {
            return $e;
            // return response()->error(500, 'An internal server error has occured while changing the password.');
        }
    }

    /**
     * Change Email Address
     * 
     */
    public function changeEmail(ChangeEmailRequest $req) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // OTP Utility
            $otp_utility = new OneTimePassword();

            // Communication Template
            $template = new CommunicationTemplates();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);

            // Get Communication Channel
            $mfa_communication_channel = MFACommunicationChannel::query()->where([
                'shortname' => 'email',
                'is_active' => true
            ])->first()->id;

            // Communication Channel is not valid or active
            if ($mfa_communication_channel == null) {
                return response()->error(
                    400,
                    'Invalid Communication Channel',
                    [
                        'emailaddress' => [$exception->getMessageString("ST002A")]
                    ]
                );
                die();
            }

            // Create OTP
            $otp = $otp_utility->Create($mfa_communication_channel, 900)->get;

            if ($otp['id'] == null) {
                return response()->error(
                    400,
                    'Invalid Communication Channel',
                    [
                        'emailaddress' => [$exception->getMessageString("MFA-E4", [
                            'type' => 'confirmation code'
                        ])]
                    ]
                );
                die();
            }

            // Store OTP in Change Email Confirmation
            $storeChangeEmail = ChangeEmailConfirmation::query()->create([
                'otp_id' => $otp['id'],
                'emailaddress' => $req->emailaddress,
                'applicant_user_id' => $currentUser->id,
                'is_confirmed' => false,
                'expires_at' => $otp['expires_at']
            ]);

            // Send OTP
            $template->sendEmail(
                'CT-001B',
                ($currentUser->firstname ?? '') . ' ' . ($currentUser->middlename ?? '') . ' ' . ($currentUser->lastname ?? ''),
                $req->emailaddress,
                'BFP-ECS Verification' , 'verification-' . hash('crc32', time()),
                [
                    'username' => $currentUser->username,
                    'otp' => $otp['code'] ?? null,
                    'csrmail' => 'support@bfp-ecs.com'
                ]
                );
            
            return response()->success(
                200, 
                'A confirmation code has been sent to your email address.', 
                [
                    'changeEmailRequest' =>  $storeChangeEmail->makeHidden(['otp_id', 'is_confirmed', 'expires_at', 'created_at', 'applicant_user_id'])
                ]
            );
        } catch (\Exception $e) {
            
            return response()->error(500, 'An internal server error has occured while changing email address.');
        }
    }

    /**
     * Change Email Address Confirmation
     */
    public function changeEmailConfirm(ChangeEmailConfirmRequest $req, int $id) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // Communication Template
            $template = new CommunicationTemplates();

            // Get User Info
            $user = ApplicantUser::query()->find($id);

            if ($user == null) {
                return response()->error('404', 'User not found.');
                die();
            }

            // Check Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);
            if ($user->id !== $currentUser->id) {
                return response()->error('403', 'You do not have enought privilege to make changes on behalf of another user.');
                die();
            }

            // ChangeEmailConfirmation
            $changeEmailConfirmation = ChangeEmailConfirmation::query()->find($req->id);

            // Check ChangeEmailConfirmation is intended for the user.
            if ($changeEmailConfirmation->applicant_user_id !== $currentUser->id) {
                return response()->error('400', 'The identifier was intended for other users.');
                die();
            }

            // Check ChangeEmailConfirmation whether expired or has already been confirmed.
            if ($changeEmailConfirmation->expires_at < Carbon::now()) {
                return response()->error('400', 'The identifier has already been expired.');
                die();
            }
            if ($changeEmailConfirmation->is_confirmed) {
                return response()->error('400', 'The identifier has already been confirmed.');
                die();
            }

            // Get OTP
            try {
                $otp = OTP::query()->findOrFail($changeEmailConfirmation->otp_id);
                $check_hash = Hash::check($req->otp, $otp->otp);

                if (!$check_hash) {
                    return response()->error(400, 'OTP Error', [
                        'otp' => [
                            $exception->getMessageString('MFA-E1A', ['type' => 'Confirmation code'])
                        ]
                    ]);

                    die();
                }

                // Set is_confirmed to true
                $changeEmailConfirmation->update([
                    'is_confirmed' => true
                ]);

                // Update email address
                $user->update([
                    'emailaddress' => $changeEmailConfirmation->emailaddress
                ]);
            } catch (ModelNotFoundException $notFound) {
                return response()->error(400, 'OTP Error', [
                    'alert' => [
                        $exception->getMessageString('MFA-E4', ['type' => 'confirmation code'])
                    ]
                ]);
                die();
            }
            
            
            
            return response()->success(
                200, 
                'Email address has been successfully updated.'
            );
        } catch (\Exception $e) {
            // return $e;
            return response()->error(500, 'An internal server error has occured while confirming the email change.');
        }
    }

    /**
     * Change Mobile Number
     */
    public function changeMobileNumber(ChangeMobileNumberRequest $req, int $id) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // OTP Utility
            $otp_utility = new OneTimePassword();

            // Communication Template
            $template = new CommunicationTemplates();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);

            // Get User Info
            $user = ApplicantUser::query()->find($id);

            if ($user == null) {
                return response()->error('404', 'User not found.');
                die();
            }

            // Check Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);
            if ($user->id !== $currentUser->id) {
                return response()->error('403', 'You do not have enought privilege to make changes on behalf of another user.');
                die();
            }

            // Get Communication Channel
            $mfa_communication_channel = MFACommunicationChannel::query()->where([
                'shortname' => 'sms',
                'is_active' => true
            ])->first()->id;

            // Communication Channel is not valid or active
            if ($mfa_communication_channel == null) {
                return response()->error(
                    400,
                    'Invalid Communication Channel',
                    [
                        'mobilenumber' => [$exception->getMessageString("ST002A")]
                    ]
                );
                die();
            }

            // Create OTP
            $otp = $otp_utility->Create($mfa_communication_channel, 900)->get;

            if ($otp['id'] == null) {
                return response()->error(
                    400,
                    'Invalid Communication Channel',
                    [
                        'mobilenumber' => [$exception->getMessageString("MFA-E4", [
                            'type' => 'confirmation code'
                        ])]
                    ]
                );
                die();
            }

            // Store OTP in Change Mobile Number Confirmation
            $storeChangeMobileNumber =  ChangeMobileNumberConfirmation::query()->create([
                'otp_id' => $otp['id'],
                'mobilenumber' => $req->mobilenumber,
                'applicant_user_id' => $currentUser->id,
                'is_confirmed' => false,
                'expires_at' => $otp['expires_at']
            ]);

            // Send OTP
            $template->sendSms(
                'CT-001C',
                $req->mobilenumber,
                [
                    'otp' => $otp['code'] ?? null
                ]
            );
            
            return response()->success(
                200, 
                'A confirmation code has been sent to your mobile number.', 
                [
                    'changeMobileNumberRequest' =>  $storeChangeMobileNumber->makeHidden(['otp_id', 'is_confirmed', 'expires_at', 'created_at', 'applicant_user_id'])
                ]
            );
        } catch (\Exception $e) {
            // return $e;
            return response()->error(500, 'An internal server error has occured while changing mobile number.');
        }
    }

    /**
     * Change Mobile Number Confirmation
     */
    public function changeMobileNumberConfirm(ChangeMobileNumberConfirmRequest $req, int $id) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // Communication Template
            $template = new CommunicationTemplates();

            // Get User Info
            $user = ApplicantUser::query()->find($id);

            if ($user == null) {
                return response()->error('404', 'User not found.');
                die();
            }

            // Check Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);
            if ($user->id !== $currentUser->id) {
                return response()->error('403', 'You do not have enought privilege to make changes on behalf of another user.');
                die();
            }

            // Change Mobile Number Confirmation
            $changeMobileNumberConfirmation = ChangeMobileNumberConfirmation::query()->find($req->id);

            // Check ChangeEmailConfirmation is intended for the user.
            if ($changeMobileNumberConfirmation->applicant_user_id !== $currentUser->id) {
                return response()->error('400', 'The identifier was intended for other users.');
                die();
            }

            // Check ChangeEmailConfirmation whether expired or has already been confirmed.
            if ($changeMobileNumberConfirmation->expires_at < Carbon::now()) {
                return response()->error('400', 'The identifier has already been expired.');
                die();
            }
            if ($changeMobileNumberConfirmation->is_confirmed) {
                return response()->error('400', 'The identifier has already been confirmed.');
                die();
            }

            // Get OTP
            try {
                $otp = OTP::query()->findOrFail($changeMobileNumberConfirmation->otp_id);
                $check_hash = Hash::check($req->otp, $otp->otp);

                if (!$check_hash) {
                    return response()->error(400, 'OTP Error', [
                        'otp' => [
                            $exception->getMessageString('MFA-E1A', ['type' => 'Confirmation code'])
                        ]
                    ]);

                    die();
                }

                // Set is_confirmed to true
                $changeMobileNumberConfirmation->update([
                    'is_confirmed' => true
                ]);

                // Update Mobile Number
                $user->update([
                    'mobilenumber' => $changeMobileNumberConfirmation->mobilenumber
                ]);

            } catch (ModelNotFoundException $notFound) {
                return response()->error(400, 'OTP Error', [
                    'alert' => [
                        $exception->getMessageString('MFA-E4', ['type' => 'confirmation code'])
                    ]
                ]);
                die();
            }
            
            return response()->success(
                200, 
                'Mobile number has been successfully updated.'
            );
        } catch (\Exception $e) {
            // return $e;
            return response()->error(500, 'An internal server error has occured while confirming the email change.');
        }
    }

    /**
     * Edit Basic Profile Information
     * 
     * @param Request $req
     * @param int $id
     * @return response()
     */
    public function editBasicProfile(EditBasicProfileRequest $req, int $id) {
        try {
            // Get User Info
            $user = ApplicantUser::query()->find($id);

            if ($user == null) {
                return response()->error('404', 'User not found.');
                die();
            }

            // Check Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id;
            if ($user->id !== $currentUser) {
                return response()->error('403', 'You do not have enought privilege to edit profile.');
                die();
            }

            // Edit user
            $user->update([
                'firstname' => $req->input('firstname', $user->firstname),
                'middlename' => $req->input('middlename', $user->middlename),
                'lastname' => $req->input('lastname', $user->lastname),
                'salutation' => $req->input('salutation', $user->salutation)
            ]);

            return response()->success(200, 'User profile has been edited successfully.');
        } catch (\Exception $e) {
            return response()->error(500, 'An internal server error has occured while processing your request to edit profile.');
        }
    }
}