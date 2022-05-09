<?php 
namespace App\Http\Controllers\Applicant;

use App\Core\Exception\Models\ExceptionModel;
use App\Core\Utilities\Authentication\ApplicantAuthUtility;
use App\Core\Utilities\Authentication\OneTimePassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\User\ChangePasswordRequest;
use App\Http\Requests\Applicant\User\EditBasicProfileRequest;
use App\Models\Applicant\User as ApplicantUser;
use App\Models\CommunicationTemplates;
use App\Models\OTP;
use App\Models\OTP\Requests as OtpRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
    public function changePassword(Request $req) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);

            // Initialize class
            $otp_request = new OtpRequest();
            $otp_utility = new OneTimePassword();

            // Find OTP request
            $find_otp_request = $otp_request
            ->findMatchingValidRequest('UCI-01A', [
                'type' => 'applicant',
                'user_id' => $currentUser->id
            ]);
            
            // Create a new request
            if ($find_otp_request->count() <= 0) {
                $create_otp_request = $otp_request->createNew('UCI-01A', [
                    'type' => 'applicant',
                    'user_id' => $currentUser->id
                ]);

                if ($req->input('mfa_communication_channel') == null) {
                    return response()->error(
                        400,
                        "Validation Error",
                        [
                            'mfa_communication_channel' => $exception->getMessageString('MFA-E2')
                        ]
                    );
                    die();
                }

                try {
                    $this->otpGenerationFlow(
                        $req->input('mfa_communication_channel'),
                        $currentUser,
                        $create_otp_request,
                        'CT-001A'
                    );

                    return response()->success(200, 'OTP has been generated.');
                    die();
                } catch (\Exception $e) {
                    return response()->error(
                        400,
                        $e->getMessage()
                    );
                    die();
                }
            }

            // An OTP Request has been found
            if ($find_otp_request->count() >= 1) {

                /** 
                 * Check if there has been an OTP generated for the OTP request,
                 * If null then attempt to generate an OTP
                */
               
                if ($find_otp_request->first()->otp == null) {
                    $this->otpGenerationFlow(
                        $req->input('mfa_communication_channel'),
                        $currentUser,
                        $find_otp_request,
                        'CT-001A'
                    );

                    return response()->success(200, 'OTP has been generated.');
                    die();
                }

                // Validate OTP
                $get_otp = OTP::query()->find($find_otp_request->first()->otp);

                
                $get_otp_hash = $get_otp->otp ?? null;
                if ($get_otp_hash == null) {
                    return response()->error(400, 'Validation Error', [
                        'otp' => $exception->getMessageString('MFA-E3')
                    ]);
                    die();
                }

                $validate_otp = Hash::check($req->input('otp'), $get_otp_hash);

                if (!$validate_otp) {
                    return response()->error(401, 'Validation Error', [
                        'otp' => [
                            $exception->getMessageString('MFA-E1')
                        ]
                    ]);
                    die();
                }

                // OTP is correct, continue change password
                $user = ApplicantUser::query()->find($currentUser->id);
                $user->update([
                    'password' => Hash::make($req->password),
                    'last_password_change' => Carbon::now()
                ]);

                // Revoke OTP and OTP Request
                $revoke_otp = $get_otp->update([
                    'is_revoked' => true
                ]);
                $revoke_otp_request = $find_otp_request->update([
                    'is_revoked' => true
                ]);
                
                return response()->success(200, 'Password has been updated successfully');
                die();
            }

            
        } catch (\Exception $e) {
            
            return response()->error(500, 'An internal server error has occured while changing the password.');
        }
    }

    /**
     * Change Email Flow
     */
    public function changeEmailFlow(Request $req) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);

            // Set New Email Address in Current User
            $currentUser->emailaddress = $req->emailaddress ?? $currentUser->emailaddress;

            // Initialize class
            $otp_request = new OtpRequest();
            $otp_utility = new OneTimePassword();

            // Transaction Type and Communication Template
            $transaction_type = 'UCI-02B';
            $communication_template = 'CT-001B';

            // Find OTP request
            $find_otp_request = $otp_request
            ->findMatchingValidRequest($transaction_type, [
                'type' => 'applicant',
                'user_id' => $currentUser->id
            ]);
            
            // Create a new request
            if ($find_otp_request->count() <= 0) {
                $create_otp_request = $otp_request->createNew($transaction_type, [
                    'type' => 'applicant',
                    'user_id' => $currentUser->id
                ]);

                try {
                    $this->otpGenerationFlow(
                        2,
                        $currentUser,
                        $create_otp_request,
                        $communication_template
                    );

                    return response()->success(200, 'OTP has been generated.');
                    die();
                } catch (\Exception $e) {
                    return response()->error(
                        400,
                        $e->getMessage()
                    );
                    die();
                }
            }

            // An OTP Request has been found
            if ($find_otp_request->count() >= 1) {

                /** 
                 * Check if there has been an OTP generated for the OTP request,
                 * If null then attempt to generate an OTP
                */
                if ($find_otp_request->first()->otp == null) {
                    $this->otpGenerationFlow(
                        2,
                        $currentUser,
                        $find_otp_request,
                        $communication_template
                    );

                    return response()->success(200, 'OTP has been generated.');
                    die();
                }

                // Validate OTP
                $get_otp = OTP::query()->find($find_otp_request->first()->otp);

                
                $get_otp_hash = $get_otp->otp ?? null;
                if ($get_otp_hash == null) {
                    return response()->error(400, 'Validation Error', [
                        'otp' => $exception->getMessageString('MFA-E3')
                    ]);
                    die();
                }

                $validate_otp = Hash::check($req->input('otp'), $get_otp_hash);

                if (!$validate_otp) {
                    return response()->error(401, 'Validation Error', [
                        'otp' => [
                            $exception->getMessageString('MFA-E1')
                        ]
                    ]);
                    die();
                }

                // OTP is correct, continue change email address
                $user = ApplicantUser::query()->find($currentUser->id);
                $user->update([
                    'emailaddress' => $req->emailaddress ?? $user->emailaddress
                ]);

                // Revoke OTP and OTP Request
                $revoke_otp = $get_otp->update([
                    'is_revoked' => true
                ]);
                $revoke_otp_request = $find_otp_request->update([
                    'is_revoked' => true
                ]);
                
                return response()->success(200, 'Email address has been updated successfully.');
                die();
            }

            
        } catch (\Exception $e) {
            
            return response()->error(500, 'An internal server error has occured while changing the password.');
        }
    }

    /**
     * Change Mobile Number Flow
     */
    public function changeMobileNumberFlow(Request $req) {
        try {
            // Exception
            $exception = new ExceptionModel();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);

            // Set New Email Address in Current User
            $currentUser->emailaddress = $req->emailaddress ?? $currentUser->emailaddress;

            // Initialize class
            $otp_request = new OtpRequest();
            $otp_utility = new OneTimePassword();

            // Transaction Type and Communication Template
            $transaction_type = 'UCI-02A';
            $communication_template = 'CT-001C';

            // Find OTP request
            $find_otp_request = $otp_request
            ->findMatchingValidRequest($transaction_type, [
                'type' => 'applicant',
                'user_id' => $currentUser->id
            ]);
            
            // Create a new request
            if ($find_otp_request->count() <= 0) {
                $create_otp_request = $otp_request->createNew($transaction_type, [
                    'type' => 'applicant',
                    'user_id' => $currentUser->id
                ]);

                try {
                    $this->otpGenerationFlow(
                        2,
                        $currentUser,
                        $create_otp_request,
                        $communication_template
                    );

                    return response()->success(200, 'OTP has been generated.');
                    die();
                } catch (\Exception $e) {
                    return response()->error(
                        400,
                        $e->getMessage()
                    );
                    die();
                }
            }

            // An OTP Request has been found
            if ($find_otp_request->count() >= 1) {

                /** 
                 * Check if there has been an OTP generated for the OTP request,
                 * If null then attempt to generate an OTP
                */
                if ($find_otp_request->first()->otp == null) {
                    $this->otpGenerationFlow(
                        2,
                        $currentUser,
                        $find_otp_request,
                        $communication_template
                    );

                    return response()->success(200, 'OTP has been generated.');
                    die();
                }

                // Validate OTP
                $get_otp = OTP::query()->find($find_otp_request->first()->otp);

                $get_otp_hash = $get_otp->otp ?? null;
                if ($get_otp_hash == null) {
                    return response()->error(400, 'Validation Error', [
                        'otp' => $exception->getMessageString('MFA-E3')
                    ]);
                    die();
                }

                $validate_otp = Hash::check($req->input('otp'), $get_otp_hash);

                if (!$validate_otp) {
                    return response()->error(401, 'Validation Error', [
                        'otp' => [
                            $exception->getMessageString('MFA-E1')
                        ]
                    ]);
                    die();
                }

                // OTP is correct, continue change email address
                $user = ApplicantUser::query()->find($currentUser->id);
                $user->update([
                    'mobilenumber' => $req->mobilenumber ?? $user->mobilenumber
                ]);

                // Revoke OTP and OTP Request
                $revoke_otp = $get_otp->update([
                    'is_revoked' => true
                ]);
                $revoke_otp_request = $find_otp_request->update([
                    'is_revoked' => true
                ]);
                
                return response()->success(200, 'Mobile number has been updated successfully.');
                die();
            }

            
        } catch (\Exception $e) {
            
            return response()->error(500, 'An internal server error has occured while changing the mobile number.');
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