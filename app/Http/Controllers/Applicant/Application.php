<?php 

namespace App\Http\Controllers\Applicant;

use App\Core\Utilities\Authentication\ApplicantAuthUtility;
use App\Http\Controllers\Controller;
use App\Http\Middleware\ApplicantAuthGuard;
use App\Http\Requests\Applicant\Application\CreateRequest;
use App\Models\FiledApplication;
use Illuminate\Http\Request;

class Application extends Controller {
    /**
     * Get All
     * 
     * @param Request $req
     * @return response()
     */
    public function getAll(Request $req) {
        try {
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;

            // Fetch
            $fetch = $filed_application->query()
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->orderByDesc('id');

            return response()->success(
                200,
                'Applications',
                $fetch->get(['id', 'application_reference_number', 'business_id', 'taxpayer_name', 'trade_name', 'status', 'created_at', 'created_by'])
            );
        } catch (\Exception $e) {
            return response()->error(
                500,
                'An internal server error has occured while fetching application.'
            );
        }
    }

    /**
     * Get By ID
     * 
     * @param Request $req
     * @param int $id
     * @return response()
     */
    public function getById(Request $req, ?int $id = 0) {
        try {
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;

            // Fetch
            $fetch = $filed_application->query()
                ->where('id', '=', $id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->first();

            // No item results in fetch
            if ($fetch == null) {
                return response()->error(404, 'Application not found.');
                die();
            }

            return response()->success(
                200,
                'Application',
                $fetch
            );
        } catch (\Exception $e) {
            return response()->error(
                500,
                'An internal server error has occured while fetching application.'
            );
        }
    }

    /**
     * Get By ID
     * 
     * @param Request $req
     * @param int $req
     * @return response()
     */

    /**
     * Create New Application
     * 
     * @param Request $req
     * @return respone()
     */
    public function create(CreateRequest $req) {
        try {
            // Filed Application Model
            $filed_application = new FiledApplication();
            $filed_application = $filed_application->CreateNewApplication(
                $req->business_id,
                $req->taxpayer_name,
                $req->trade_name,
                [
                    'tin' => $req->other['tin'] ?? null,
                    'branch_code' => $req->other['branch_code'] ?? null,
                    'rdo_code' => $req->other['rdo_code'] ?? null,
                    'taxpayer_name' => $req->taxpayer_name ?? null,
                    'date_of_birth' => $req->other['date_of_birth'] ?? null,
                    'date_of_incorporation' => $req->other['date_of_incorporation'] ?? null,
                    'sec_registration_number' => $req->other['sec_registration_number'] ?? null,
                    'company_name' => $req->other['company_name'] ?? null,
                    'trade_name' => $req->trade_name ?? null,
                    'businesstype' => $req->businesstype
                ],
                $req->province,
                $req->city,
                $req->barangay,
                $req->geomap,
                [
                    'type' => 'applicant',
                    'user_id' => ApplicantAuthUtility::CurrentUser($req)->id
                ],
                $req->businesstype,
                $req->certificatetype,
                $req->businessline
            );

            // Create New Request
            return response()->success(
                200,
                'Application has been created successfully.',
                $filed_application
            );
        } catch (\Exception $e) {
            throw $e;
            // return response()->error(500, 'An internal server error has occured while creating a new application.');
        }
    }
}