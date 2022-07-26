<?php 

namespace App\Http\Controllers\Applicant;

use App\Core\Exception\Models\ExceptionModel;
use App\Core\Utilities\Authentication\ApplicantAuthUtility;
use App\Core\Utilities\Generator\Uuid;
use App\Http\Controllers\Controller;
use App\Http\Middleware\ApplicantAuthGuard;
use App\Http\Requests\Applicant\Application\AddEquipment;
use App\Http\Requests\Applicant\Application\CreateRequest;
use App\Http\Requests\Applicant\Application\UpdateApplicationRequest;
use App\Http\Resources\FiledApplication\GetFilesByApplicationIdResource;
use App\Models\Basedata\DocType;
use App\Models\Basedata\Equipments as BasedataEquipments;
use App\Models\FiledApplication;
use App\Models\FiledApplication\Equipments;
use App\Models\FiledApplication\UploadedFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Application
 * @package App\Http\Controllers\Applicant
 */
class Application extends Controller {
    /**
     * Get All
     * 
     * @route:get /
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

            // Paginate
            $pagination = filter_var($req->get('paginate', 'false'), FILTER_VALIDATE_BOOLEAN);
            $paginationLimit = $req->get('limit') ?? 10;

            // Fetch
            $fetch = $filed_application->query()
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->orderBy('id', 'desc');

            if ($pagination) {
                $fetch = $fetch->paginate($paginationLimit, ['*'])->toArray();
            } else {
                $fetch = $fetch->get();
            }

            return response()->success(
                200,
                'Applications',
                $fetch['data'] ?? $fetch ?? null,
                $fetch ?? null
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
     * @route:get /{id}
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
     * @route:post /
     * 
     * @param Request $req
     * @return respone()
     */
    public function create(CreateRequest $req) {
        try {
            // Filed Application Model
            $filed_application = new FiledApplication();
            
            $filed_application = $filed_application->createNewApplication(
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
                    'businesstype' => $req->businesstype,
                    'cda_registration_number' => $req->other['cda_registration_number'] ?? null,
                    'cda_registration_date' => $req->other['cda_registration_date'] ?? null,
                    'dti_registtration_number' => $req->other['dti_registration_number'] ?? null,
                    'dti_registration_date' => $req->other['dti_registration_date'] ?? null,
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
                $req->businessline,
                $req->address,
                $req->draftmode,
                $req->preferred_inspectiontype,
                $req->preferred_inspectionschedule
            );

            // Create New Request
            return response()->success(
                200,
                'Application has been created successfully.',
                $filed_application
            );
        } catch (\Exception $e) {
            // throw $e;
            return response()->error(500, 'An internal server error has occured while creating a new application.');
        }
    }

    /**
     * Update Application
     * 
     * @route:put /{id}
     * 
     * @param Request $req
     * @param int $id
     * @return response()
     */
    public function updateApplication(UpdateApplicationRequest $req, $id) {
        try {
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();
            
            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;
            
            // Fetch
            $fetch = $filed_application->query()
                ->where('id', '=', $req->id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->first();
            
            // No item results in fetch
            if ($fetch == null) {
                return response()->error(404, 'Application not found.');
                die();
            }
            
            try {
                // Update
                $filed_application->updateApplication($id, $req->toArray());
            } catch (\Exception $e) {
                return response()->error(500, $e->getMessage());
            }
            

            return response()->success(200, 'Application has been updated successfully.');
        } catch (\Exception $e) {
            return response()->error(500, 'An internal server error has occured while updating an application.');
        }
    }

    /**
     * Upload File in Created/Filed Application
     * 
     * @route:post /{id}/file
     * 
     * @param Request $req
     * @param int $id
     * 
     * @return mixed
     */
    public function uploadFile(Request $req, int $id) {
        try {
            // Initialize Exception
            $exception = new ExceptionModel();
            
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;

            try {
                // Fetch
                $fetch = $filed_application->query()
                ->where('id', '=', $id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->firstOrFail();
            } catch (ModelNotFoundException $applicationNotFound) {
                return response()->error(404, 'Application not found.');
            }
            
            // Check if document file was present
            if (!$req->hasFile('document')) {
                return response()->error(
                    400,
                    'No File'
                );
                die();
            }
           

            // Check if document file has valid file extension based on doctype ID
            try {
                $doctype = DocType::query()->findOrFail($req->get('doctype'));
            } catch (ModelNotFoundException $notFound) {
                return response()->error(
                    400,
                    $exception->getMessageString('AP002B')
                );
            } 

            $file = $req->file('document');
                
            if (!in_array($file->getClientOriginalExtension(), $doctype->accepted_file_extension)) {
                return response()->error(
                    400,
                    'Unsupported File Extension',
                    [
                        'document' => [
                            $exception->getMessageString("AP002C", [
                                'FileExt' => $file->getClientOriginalExtension()
                            ])
                        ]
                    ]
                );
                die();
            }
            
            // Create File Context
            // $fileContext = fopen($req->file('document'), 'r+');
            $uuid = Uuid::create()->v4;
            $fileContextHash = [
                'md5' => hash('md5', file_get_contents($file)),
                'sha1' => hash('sha1', file_get_contents($file)),
                'sha256' => hash('sha256', file_get_contents($file)),
            ];
            $fileContextFolder = 'filedapplication/' . ($uuid ?? $fileContextHash['md5']) . '/';
            $fileContextName = str_replace(' ', '_', urldecode($file->getClientOriginalName()));
            $fileContextPath = $fileContextFolder . $fileContextName;

            try {
                // Check if file exist in S3
                $checkExist = Storage::disk('s3')->exists($fileContextPath);

                if (!$checkExist) {
                    $upload = Storage::disk('s3')->put($fileContextPath, file_get_contents($req->file('document')));

                    if (!$upload) {
                        throw new \Exception('S3 File Upload Error');
                    }
                }
            } catch (\Exception $e) {
                return response()->error(400, $e->getMessage());
            }

            try {
                // Store File Information in Database
                $contextInfo = [
                    'path' => $fileContextPath,
                    'hash' => $fileContextHash,
                    'file' => [
                        'mime_type' => $file->getClientMimeType(),
                        'extension' => $file->getClientOriginalExtension(),
                        'name' => $file->getClientOriginalName(),
                        'size' => $file->getSize() ?? 0
                    ]
                ];
                $storeInfo = UploadedFiles::query()->create([
                    'filedapplication' => $id,
                    'doctype' => $doctype->id,
                    'context' => json_encode($contextInfo),
                    'created_by' => (new FiledApplication())->formatCreatedByUser(['type' => 'applicant', 'user_id' => $currentUser], true)
                ]);

                
            } catch (\Exception $errorStoring) {
                // return $errorStoring;
                return response()->error(400, 'File Info Storing Error');
            }

            return response()->success(
                200,
                'File has been uploaded.',
                $storeInfo->setVisible(['id', 'context', 'created_at', 'created_by'])
            );
        } catch (\Exception $e) {
            return response()->error(500, 'An internal server error has occured while uploading the file.');
        }
    }

    /**
     * Get Uploaded Files
     * 
     * @route:get /{id}/file
     * 
     * @param Request $req
     * @param int $id
     * 
     * @return mixed
     */
    public function getUploadedFiles(Request $req, int $id) {
        try {
            // Initialize Exception
            $exception = new ExceptionModel();
            
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;

            try {
                // Fetch
                $fetch = $filed_application->query()
                ->where('id', '=', $id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->firstOrFail();
            } catch (ModelNotFoundException $applicationNotFound) {
                return response()->error(404, 'Application not found.');
            }

            // Get All Files
            $uploadedFiles = UploadedFiles::query()->where([
                'filedapplication' => $id
            ])->orderBy('created_at', 'DESC');
            if ($uploadedFiles->count() <= 0) {
                return response()->error(404, 'File(s) not found.');
                die();
            }

            return response()->success(
                200,
                'Uploaded Files',
                $uploadedFiles->get(['id', 'context', 'created_at'])->makeHidden(['original_context_path', 'context_file'])
            );
        } catch (\Exception $e) {
            return $e;
            // return response()->error(500, 'Error while fetching uploaded files.');
        }
    }

    /**
     * Get Uploaded File by its ID
     * 
     * @route:get /{id}/file/{file_id}
     * 
     * @param Request $req
     * @param int $id
     * @param int $file_id
     * 
     * @return mixed
     */
    public function getUploadedFileById(Request $req, int $id, int $file_id) {
        try {
            // Initialize Exception
            $exception = new ExceptionModel();
            
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;

            try {
                // Fetch Filed Application
                $fetch = $filed_application->query()
                ->where('id', '=', $id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->firstOrFail();

                
            } catch (ModelNotFoundException $applicationNotFound) {
                return response()->error(404, 'Application not found.');
            }

            // Get All Files
            try {
                $uploadedFiles = UploadedFiles::query()
                    ->findOrFail($file_id, ['id', 'context', 'created_at'])
                    ->makeHidden(['original_context_path', 'context_file'])
                    ->append('filelink');
            } catch (ModelNotFoundException $fileNotFound) {
                return response()->error(404, 'File not found.');
            }
            

            return response()->success(
                200,
                'Uploaded Files',
                $uploadedFiles
            );
        } catch (\Exception $e) {
            return response()->error(500, 'Error while fetching uploaded file.');
        }
    }

    /**
     * Delete Uploaded File by ID
     * 
     * @route:delete /{id}/file/{file_id}
     * 
     * @param Request $req
     * @param int $id
     * @param int $file_id
     * 
     * @return mixed
     */
    public function deleteUploadedFileById(Request $req, int $id, int $file_id) {
        try {
            // Initialize Exception
            $exception = new ExceptionModel();
            
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();

            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;

            try {
                // Fetch
                $fetch = $filed_application->query()
                ->where('id', '=', $id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->firstOrFail();
            } catch (ModelNotFoundException $applicationNotFound) {
                return response()->error(404, 'Application not found.');
            }

            // Get All Files
            try {
                $uploadedFile = UploadedFiles::query()->findOrFail($file_id, ['id', 'context', 'created_at'])->append('original_context');

            } catch (ModelNotFoundException $fileNotFound) {
                return response()->error(404, $exception->getMessageString('FS002'));
            }

            // Check if file exist in S3
            $checkFromS3 = Storage::disk('s3')->exists($uploadedFile->original_context);

            if (!$checkFromS3) {
                $uploadedFile->delete();
                return response()->error(
                    404,
                    $exception->getMessageString('FS001')
                );
                die();
            }

            // Delete from S3
            $deleteFromS3 = Storage::disk('s3')->delete($uploadedFile->original_context);

            // Delete from DB
            $uploadedFile->delete();

            return response()->success(
                200,
                $uploadedFile->context->file->name . ' has been deleted.',
            );
        } catch (\Exception $e) {
            return response()->error(500, 'Error while deleting file.');
        }
    }

    /**
     * Add Equipment
     * 
     * @route:post /{id}/equipment
     * 
     * @param Request $req
     * @param int $id
     */
    public function addEquipment(AddEquipment $req, ?int $application_id = 0) {
        try {
            // Initialize Exception
            $exception = new ExceptionModel();
            
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();
            
            // Initialize Equipment model
            $equipment = new Equipments();
            
            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;
            
            // Fetch Filed Application
            try {
                $fetch = $filed_application->query()
                ->where('id', '=', $application_id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->firstOrFail();
            } catch (ModelNotFoundException $applicationNotFound) {
                return response()->error(404, 'Application not found.');
            }

            // Get Status from Shortname

            // Create Equipment
            $equipment->filedapplication = $application_id;
            $equipment->equipment = $req->equipment;
            $equipment->context = json_encode($req->context);
            $equipment->status = 1;
            $equipment->created_by = json_encode([
                'type' => 'applicant',
                'user_id' => $currentUser
            ]);
            $equipment->save();

            return response()->success(200, 'Equipment has been added.', $equipment->makeHidden(['created_by']));
        } catch (\Exception $e) {
            return response()->error(500, 'Error while adding equipment.', $e->getMessage());
        }
    }

    /**
     * Get Equipment
     * 
     * @route:get /{id}/equipment
     */
    public function getEquipment(Request $req, int $application_id) {
        try {
            // Initialize Exception
            $exception = new ExceptionModel();
            
            // Initialize FiledApplicaton model
            $filed_application = new FiledApplication();
            
            // Initialize Equipment model
            $equipment = new Equipments();
            
            // Current User
            $currentUser = ApplicantAuthUtility::CurrentUser($req)->id ?? null;
            
            // Fetch Filed Application
            try {
                $fetch = $filed_application->query()
                ->where('id', '=', $application_id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->firstOrFail();
            } catch (ModelNotFoundException $applicationNotFound) {
                return response()->error(404, 'Application not found.');
            }
            
            // Get All Equipment
            try {
                $equipment = $equipment->query()
                ->where('filedapplication', '=', $application_id)
                ->where('created_by->type', '=', 'applicant')
                ->where('created_by->user_id', '=', $currentUser)
                ->with(['equipment', 'status'])
                
                ->get(['id', 'equipment', 'context', 'status', 'created_at']);
            } catch (ModelNotFoundException $equipmentNotFound) {
                return response()->error(404, 'Equipment not found.');
            }
            
            return response()->success(200, 'Equipment', $equipment);
        } catch (\Exception $e) {
            return response()->error(500, 'Error while fetching equipment.');
        }
    }

}