<?php 

namespace App\Http\Controllers\Applicant\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Token extends Controller {
    public function Login(Request $req) {

    }

    public function ValidateToken(Request $req) {
        try {
            return response()->error(400, 'Token is valid');
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
}