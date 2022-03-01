<?php
/**
 * @package App\Http\Controllers\Applicant\Auth 
 */ 

namespace App\Http\Controllers\Applicant\Auth;

use App\Http\Controllers\Controller;
use App\Utility\OTP;
use Illuminate\Http\Request;

class Registration extends Controller {
    /**
     * @method FormatMobileNumber
     * @param string $mobileNumber
     */
    public function FormatMobileNumber(string $mobileNumber) {
        /*
        |--------------------------------------------------------------------------
        | Remove Leading Zero (Left-Side)
        | e.g. (Input: 09052462286) (Output: 9052462286)
        |--------------------------------------------------------------------------
        */
        $mobileNumber = ltrim($mobileNumber, "0");

        return $mobileNumber;
    }
    
    /**
     * @method CreateOTP
     * This function is responsible for the validating the phone number.
     */
    public function CreateOTP(Request $req) {
        try {
            $serialize = [
                'otp' => (new OTP)->Create()->get['otp']
            ];

            return response()->success(200, 'OK', $serialize);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
}