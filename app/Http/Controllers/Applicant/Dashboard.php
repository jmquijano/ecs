<?php

namespace App\Http\Controllers\Applicant;

use App\Core\Utilities\Authentication\ApplicantAuthUtility;
use App\Http\Controllers\Controller;
use App\Models\FiledApplication;
use Illuminate\Http\Request;

class Dashboard extends Controller {
    public function WidgetCounter(Request $req) {
        try {
            $counter = array();

            // Get Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req);

            // Submitted Application
            $submittedApplication = FiledApplication::query()
                                    ->where('created_by->type', '=', 'applicant')
                                    ->where('created_by->user_id', '=', $currentUser->id)
                                    ->count();
            $counter['submitted_application'] = [
                'count' => $submittedApplication 
            ];

            // All Issued FSIC
            $counter['issued_fsic'] = [
                'count' => 0
            ];

            // Expiring FSIC
            $counter['expiring_fsic'] = [
                'count' => 0
            ];

            // Expired FSIC
            $counter['expired_fsic'] = [
                'count' => 0
            ];



            return response()->success(
                200,
                'Dashboard Widget Counter',
                $counter
            );
        } catch (\Exception $e) {
            return response()->error(500, 'An internal server error has occured while running widget counter.');
        }
    }
}