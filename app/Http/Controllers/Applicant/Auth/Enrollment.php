<?php
/**
 * @package App\Http\Controllers\Applicant\Auth 
 */ 

namespace App\Http\Controllers\Applicant\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Enrollment extends Controller {
    
    /**
     * @method Details
     * This function is responsible for form detail entry validation, and storage.
     */
    public function Details(Request $req) {
        try {
            return response()->success(200, 'OK');
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
}