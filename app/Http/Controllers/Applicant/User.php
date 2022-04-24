<?php 
namespace App\Http\Controllers\Applicant;

use App\Core\Utilities\Authentication\ApplicantAuthUtility;
use App\Http\Controllers\Controller;
use App\Models\Applicant\User as ApplicantUser;
use Illuminate\Http\Request;

class User extends Controller {
    /**
     * Get Profile
     * 
     * @param Request $req
     * @return response()
     */
    public function GetProfile(Request $req) {
        try {
            // Get User Info
            $user = ApplicantAuthUtility::CurrentUser($req)->makeHidden([
                'password'
            ]);

            return response()->success(
                200,
                'User Profile',
                $user
            );
        } catch (\Exception $e) {
            return response()->error(500, 'An internal server error has occured while fetching user profile.');
        }
    }
}