<?php 

namespace App\Models;

use App\Models\Applicant\User as ApplicantUser;
use App\Models\Basedata\BusinessType;
use App\Models\Basedata\CertificateType;
use App\Models\Basedata\FiledApplicationStatus;
use App\Models\Basedata\InspectionType;
use App\Models\Basedata\PSIC;
use App\Models\Basedata\RevenueDistrictOffice;
use App\Models\Boundaries\PSGC;
use DateTime;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Filed Application
 * @package App\Models
 * 
 * @table filedapplication
 * @primarykey id
 * 
 * @fillable (string) application_reference_number
 * @fillable (string) business_id
 * @fillable (string) taxpayer_name
 * @fillable (string) trade_name
 * @fillable (json) other_info
 * @fillable (int) barangay
 * @fillable (int) city
 * @fillable (int) province
 * @fillable (json) geomap
 * @fillable (bool) status
 * @fillable (int) client_info_link
 * @fillable (json) created_by
 * @fillable (timestamptz) created_by
 * @fillable (int) businesstype
 * @fillable (int) businessline
 * @fillable (json) address
 */
class FiledApplication extends Model {
    protected $table = 'filedapplication';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = [
        'application_reference_number',
        'business_id',
        'taxpayer_name',
        'trade_name',
        'other_info',
        'barangay',
        'city',
        'province',
        'geomap',
        'status',
        'client_info_link',
        'created_by',
        'created_at',
        'businesstype',
        'certificationtype',
        'businessline',
        'address',
        'preferred_inspectiontype',
        'preferred_inspectionschedule'
    ];

    /**
     * Get "other_info" attribute
     * Retrieve BIR RDO info (if available)
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getOtherInfoAttribute($value) {
        $info = json_decode($value, true);
        try {
            // Retrieve RDO info
            if (isset($info->bir->rdo)) {
                $info->bir->rdo = RevenueDistrictOffice::query()->findOrFail($info->bir->rdo)->makeHidden(['is_active']);
            }
            
        } catch (ModelNotFoundException $e) {

        }
        return $info;
    }

    /**
     * Get "geomap" attribute
     * Decode $value to json
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getGeomapAttribute($value) {
        return json_decode($value);
    }

    /**
     * Get "created_by" attribute
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getCreatedByAttribute($value) {
        $created = json_decode($value);
        $type = strtolower($created->type);
        $user = (
            $type == "applicant" ?
            ApplicantUser::query()->find($created->user_id)->makeHidden([
                'last_password_change',
                'password', 
                'is_active', 
                'emailaddress',
                'mobilenumber',
                'is_emailaddress_verified', 
                'is_mobilenumber_verified',
                'is_mfa_enabled',
                'created_at',
                'updated_at'
            ])
            :
            null
        );

        return $user;
    }

    /**
     * Get "businessline" attribute
     * Fetch from PSIC
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getBusinesslineAttribute($value) {
        // Retrieve from PSIC
        $business_lines = array();

        foreach (json_decode($value) as $industry) {
            $business_lines[] = PSIC::query()->find($industry)->makeHidden(['is_active']);
        }

        return $business_lines;
    }

    /**
     * Get "barangay" attribute
     * Fetch from PSGC 
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getBarangayAttribute($value) {
        // Retrieve from PSGC
        $psgc = PSGC::query()->find($value)->makeHidden(['is_active']);

        return $psgc;
    }

    /**
     * Get "city" attribute
     * Fetch from PSGC
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getCityAttribute($value) {
        // Retrieve from PSGC
        $psgc = PSGC::query()->find($value)->makeHidden(['is_active']);

        return $psgc;
    }

    /**
     * Get "province" attribute
     * Fetch from PSGC
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getProvinceAttribute($value) {
        // Retrieve from PSGC
        $psgc = PSGC::query()->find($value)->makeHidden(['is_active']);

        return $psgc;
    }

    /**
     * Get "businesstype" attribute
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getBusinesstypeAttribute($value) {
        // Retrieve from Basedata
        $businesstype = BusinessType::query()->find($value)->makeHidden(['is_active']);

        return $businesstype;
    }

    /**
     * Get "certificationtype" Attribute
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getCertificationtypeAttribute($value) {
        // Retrieve from Basedata
        $certificationtype = CertificateType::query()->find($value)->makeHidden(['is_active']);

        return $certificationtype;
    }

    /**
     * Get "status" attribute.
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getStatusAttribute($value) {
        // Retrieve from Basedata
        $status = FiledApplicationStatus::query()->find($value)->makeHidden(['is_active']);

        return $status;
    }

    /**
     * Get "preferred_inspectionschedule" attribute.
     * Decodes JSON value
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getPrreferredInspectionschedule($value) {
        return json_decode($value);
    }

    #region PSGC Relationship
    /**
     * Attribute "barangay" relationship to "PSGC" Base Data.
     * 
     * @return Illuminate\Database\Eloquent\Concerns\HasRelationships::belongsTo
     */
    public function barangay() {
        return $this->belongsTo(PSGC::class);
    }

    /**
     * Attribute "city" relationship to "PSGC" Base Data.
     * 
     * @return Illuminate\Database\Eloquent\Concerns\HasRelationships::belongsTo
     */
    public function city() {
        return $this->belongsTo(PSGC::class);
    }

    /**
     * Attribute "province" relationship to "PSGC" Base Data.
     * 
     * @return Illuminate\Database\Eloquent\Concerns\HasRelationships::belongsTo
     */
    public function province() {
        return $this->belongsTo(PSGC::class);
    }
    #endregion

    /**
     * Attribute "status" relationship to "FiledApplicationStatus" Base Data.
     * 
     * @return Illuminate\Database\Eloquent\Concerns\HasRelationships::belongsTo
     */
    public function status() {
        return $this->belongsTo(FiledApplicationStatus::class);
    }

    /**
     * Attribute "businessType" relationship to "BusinessType" Base Data.
     * 
     * @return Illuminate\Database\Eloquent\Concerns\HasRelationships::belongsTo
     */
    public function businesstype() {
        return $this->belongsTo(BusinessType::class);
    }

    /**
     * Attribute "certificationtype" relationship to "CertificateType" Base Data.
     * 
     * @return Illuminate\Database\Eloquent\Concerns\HasRelationships::belongsTo
     */
    public function certificationtype() {
        return $this->belongsTo(CertificateType::class);
    }

    /**
     * Check Record if Primary Key (ID) exist.
     * 
     * @param int $pk
     * @return bool
     */
    public function exist(int $pk) : bool {
        try {
            $check = $this->query()->find($pk);

            if ($check !== null) {
                // Item exist
                return true;
            } else {
                // Item does not exist
                return false;
            }
        } catch (\Exception) {
            return false;
        }
    }

    /**
     * Generate Reference Number.
     * 
     * Generated format is {YYYY}{MM}{Increment}, example is 20220400001, 
     * The increment is the inndicative numeric value of the sequence the application has been created for the particular Month and Year.
     * Within a particular month and year the range of which the increment is at 00001 to 99999.
     *  
     * @return string
     */
    public function generateReferenceNumber() {
        // column
        $column = 'application_reference_number';

        // Set a prefix
        $prefix = date('Y') . date('m');

        // Find the highest reference number
        $highest = $this->query()->orWhere($column, 'like',  $prefix . '%');

        $highest = (
            $highest->count() >= 1 ? 
            // (intval($highest->max($column)) + 1)
            intval($highest->max($column)) + 1
            : 
            $prefix . sprintf('%05d', $highest->count() + 1)
        );

        return strval(
            $highest
        );
    }
    /**
     * Format Other Information
     * 
     * @param array $info
     * @param bool $toJson -
     * 
     * @return string If param $toJson is set to True.
     * @return array If param $toJson is set to False.
     */
    public function formatOtherInformation(array $info = [], bool $toJson = false, $oldValue = null) {
        /**
         * Format the Array
         * 
         * "bir.tin":
         * Branch Code is the last three (3) digit of the BIR TIN which can be found on your form 2303 (a.k.a. Certificate of Registration).
         * For businesses having more than one (1) location, the branch code will increment starting from 000, 001, ...
         * On my observation, the initial three (3) digit branch code has been expanded to 
         * five (5) digits on multiple eWallet payment channels (e.g. GCash, Paymaya, and myEG)
         * My verdict is to extend the "Branch Code" to five (5) digits for future use.
         * 
         * "bir.rdo": 
         * It is the Revenue District Office of BIR where the business establishment is currently under at.
         * 
         */        
        $other_info = [
            'bir' => [
                'tin' => sprintf('%09d', $info['tin'] ?? $oldValue->other_info['bir']['tin'] ?? 0),
                'branch_code' => sprintf('%05d', $info['branch_code'] ?? $oldValue->other_info['bir']['branch_code'] ?? null),
                'rdo' => $info['rdo_code'] ?? $oldValue->other_info['bir']['rdo'] ?? 0, // Revenue District Code
                'taxpayer_name' => $info['taxpayer_name'] ?? $oldValue->other_info['bir']['taxpayer_name'] ?? null,
                'date_of_birth' => $info['date_of_birth'] ?? $oldValue->other_info['bir']['date_of_birth'] ?? null
            ],
            'sec' => [
                'registration_number' => null,
                'company_name' => null,
                'date_of_incorporation' => null // Date of Incorporation
            ],
            'dti' => [
                'trade_name' => null
            ]
        ];

        // Check if Business Type is Individual, Corporation, Partnership, or Cooperatives.
        // This will ensure that the accepted and stored values from parameter(s) being received are under the correct Governing Body/Agency.
        $check = BusinessType::query()->find($oldValue->businesstype->id ?? $info['businesstype']);

        if ($check !== null) {
            // If the attribute value of shortname will match "CORP", "PRTN" or "COOP", 
            // then it will accept value(s) from parameter(s) pertaining to the Securities and Exchange Commission (CDA)
            if (
                in_array(
                    $check->shortname, 
                    ['CORP', 'PRTN', 'COOP']
                )
            ) {
                $other_info['sec']['company_name'] = $info['taxpayer_name'] ?? $info['trade_name'] ?? $info['company_name'] ?? $oldValue->other_info['sec']['company_name'] ?? null;
                $other_info['sec']['registration_number'] = $info['sec_registration_number'] ?? $oldValue->other_info['sec']['registration_number'] ?? null;
                $other_info['sec']['date_of_incorporation'] = $info['date_of_birth'] ?? $info['date_of_incorporation'] ?? $oldValue->other_info['sec']['date_of_incorporation'] ?? null;

                // If the attribute value of shortname is "COOP",
                // then it will accept value(s) from parameter(s) pertaining to the Cooperative Development Authority (CDA)
                if ($check->shortname == 'COOP') {
                    $other_info['cda']['registration_number'] = $info['cda_registration_number'] ?? $oldValue->other_info['cda']['registration_number'] ?? null;
                    $other_info['cda']['registration_date'] = $info['cda_registration_date'] ?? $oldValue->other_info['cda']['registration_date'] ?? null;
                }

            } 
            // If the attribute value of shortname is "INDV",
            // then it will accept value(s) from parameter(s) pertaining to the Department of Trade and Industry (DTI).
            else if (
                in_array(
                    $check->shortname, 
                    ['INDV']
                )
            ) {
                $other_info['dti']['trade_name'] = $info['trade_name'] ?? $oldValue->other_info['dti']['trade_name'] ?? null;
                $other_info['dti']['registration_number'] = $info['dti_registration_number'] ?? $oldValue->other_info['dti']['registration_number'] ?? null;
                $other_info['dti']['registration_date'] = $info['dti_registration_date'] ?? $oldValue->other_info['dti']['registration_date'] ?? null;
            }
        }


        return $toJson ? json_encode($other_info) : $other_info;
    }

    /**
     * Format Created By User
     * 
     * @param array $user
     */
    public function formatCreatedByUser(array $user, ?bool $toJson = false) {
        $created_by = array();
        if (isset($user['type'])) {
            $created_by['type'] = $user['type'] ?? '';
        }
        if (isset($user['user_id'])) {
            $created_by['user_id'] = $user['user_id'] ?? '';
        }

        return $toJson ? json_encode($created_by) : $created_by;
    }

    /**
     * Create New Application
     * 
     * @param string $business_id
     * @param string $taxpayer_name
     * @param string|null $trade_name
     * @param array|null $other_information
     * @param int $province
     * @param int $city
     * @param int $barangay
     * @param array $geomap
     * @param array $user
     * @param int $businesstype
     * @param int $certificatetype
     * @param array|null $businessline
     * @param array|null $address 
     * @param bool $draftmode If this has been set to "True" then the "Status" would be set to "DRAFT" else it will be set to "CREATED".
     * @param int|null $preferred_inspctiontype Can be set to null on certain occassion. 
     * @param array|null $preferred_inspectionschedule
     * 
     * @return Illuminate\Database\Eloquent\Builder::create
     * @throws \Exception $e
     */
    public function createNewApplication(
        string $business_id, 
        string $taxpayer_name,
        ?string $trade_name = null,
        ?array $other_information = null,
        int $province,
        int $city,
        int $barangay,
        array $geomap,
        array $user,
        int $businesstype,
        int $certificatetype,
        ?array $businessline = [],
        ?array $address = [],
        ?bool $draftmode = false,
        ?int $preferred_inspectiontype = 0,
        ?array $preferred_inspectionschedule = []
    ) {
        try {
            // Generate Application Reference Number
            $application_reference_number = $this->generateReferenceNumber();

            // Format created by
            $created_by = $this->formatCreatedByUser($user, true);

            // Format Other Information
            $other_info = $this->formatOtherInformation($other_information, true);

            // Format Geomap
            $geomap = json_encode([
                'longitude' => floatval($geomap['longitude']) ?? 0,
                'latitude' => floatval($geomap['latitude']) ?? 0
            ]);

            // Format Business Line
            $businessline = json_encode($businessline);

            // Format Address
            $address = json_encode($address);

            // Draft Mode
            $draftmode = filter_var($draftmode, FILTER_VALIDATE_BOOLEAN);

            // Filed Application Status
            try {
                $status = new FiledApplicationStatus();

                if ($draftmode) {
                    $status = $status->findByShortname('DRAFT');
                } else {
                    $status = $status->findByShortname('CREATED');
                }
                
            } catch (ModelNotFoundException $e) {
                throw $e;
                // stop the operation
                die();
            }

            // Preferred Inspection
            try {
                $inspectiontype = new InspectionType();
                $inspectiontype = $inspectiontype->findById($preferred_inspectiontype, true)->id;
            } catch (ModelNotFoundException $e) {
                throw $e;
                die();
            }

            // Inspection Schedule
            $inspectionschedule = json_encode($preferred_inspectionschedule);
            
            // Store/Save in DB
            $save = $this->query()->create([
                'application_reference_number' => $application_reference_number,
                'business_id' => $business_id,
                'taxpayer_name' => $taxpayer_name,
                'trade_name' => $trade_name,
                'other_info' => $other_info, // json
                'barangay' => $barangay,
                'city' => $city,
                'province' => $province,
                'geomap' => $geomap,
                'status' => $status->id,
                'created_by' => $created_by, // json
                'businesstype' => $businesstype,
                'certificationtype' => $certificatetype,
                'businessline' => $businessline,
                'address' => $address,
                'preferred_inspectiontype' => $inspectiontype,
                'preferred_inspectionschedule' => $inspectionschedule
            ]);

            return $save; 

            
        } catch (\Exception $e) {
            throw $e;
        }
    }

    private function getId(array $payload = [], bool $asJson = false) {
        // For each item in payload, get the id
        $ids = [];
        foreach ($payload as $key => $value) {
            $ids[] = $value['id'];
        }

        return $asJson ? json_encode($ids) : $ids;
    }

    /**
     * Update Application 
     * 
     * @param int $id
     * 
     * @return Illuminate\Database\Eloquent\Builder::update
     * @throws \Exception $e
     */
    public function updateApplication(int $id, array $data) {
        try {
            $update = $this->query()->findOrFail($id);

            // Format Other Information
            $other_info = $this->formatOtherInformation($data['other'] ?? [], true, $update);

            // Format Geomap
            $geomap = json_encode([
                'longitude' => str($data['geomap']['longitude'] ?? $update->geomap->longitude) ?? null,
                'latitude' => str($data['geomap']['latitude'] ?? $update->geomap->latitude) ?? null
            ]);  
            
            // Format Business Line
            $businessline = json_encode($data['businessline'] ?? $this->getId($update->businessline, false));
            
            // Update in DB
            $update = $update->update([
                'trade_name' => $data['trade_name'] ?? $update->trade_name,
                'taxpayer_name' => $data['taxpayer_name'] ?? $update->taxpayer_name,
                'business_id' => $data['business_id'] ?? $update->business_id,
                'barangay' => $data['barangay'] ?? $update->barangay->id,
                'city' => $data['city'] ?? $update->city->id,
                'province' => $data['province'] ?? $update->province->id,
                'businesstype' => $data['businesstype'] ?? $update->businesstype->id,
                'certificationtype' => $data['certificationtype'] ?? $update->certificationtype->id,
                'status' => $data['status'] ?? $update->status->id,
                'other_info' => $other_info, // json
            ]);
            
            return $update;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}