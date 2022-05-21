<?php 

namespace App\Models;

use App\Models\Applicant\User as ApplicantUser;
use App\Models\Basedata\BusinessType;
use App\Models\Basedata\CertificateType;
use App\Models\Basedata\FiledApplicationStatus;
use App\Models\Basedata\PSIC;
use App\Models\Basedata\RevenueDistrictOffice;
use App\Models\Boundaries\PSGC;
use DateTime;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
        'created_by', // json
        'created_at',
        'businesstype',
        'certificationtype',
        'businessline'
    ];

    /**
     * Get "other_info" attribute
     * 
     * Retrieve BIR RDO info (if available)
     */
    public function getOtherInfoAttribute($value) {
        $info = json_decode($value);
        
        // Retrieve RDO info
        $info->bir->rdo = RevenueDistrictOffice::query()->find($info->bir->rdo)->makeHidden(['is_active']);

        return $info;
    }

    /**
     * Get "geomap" attribute
     * 
     * Decode $value to json
     */
    public function getGeomapAttribute($value) {
        return json_decode($value);
    }

    /**
     * Get "created_by" attribute
     * 
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
     * @param $value
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
     * @param int $value
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
     * @param int $value
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
     * @param int $value
     */
    public function getProvinceAttribute($value) {
        // Retrieve from PSGC
        $psgc = PSGC::query()->find($value)->makeHidden(['is_active']);

        return $psgc;
    }

    /**
     * Get "businesstype" attribute
     * 
     * @param int $value
     */
    public function getBusinesstypeAttribute($value) {
        // Retrieve from Basedata
        $businesstype = BusinessType::query()->find($value)->makeHidden(['is_active']);

        return $businesstype;
    }

    /**
     * Get "certificationtype" Attribute
     * 
     * @param int $value
     */
    public function getCertificationtypeAttribute($value) {
        // Retrieve from Basedata
        $certificationtype = CertificateType::query()->find($value)->makeHidden(['is_active']);

        return $certificationtype;
    }

    /**
     * Get "status" attribute
     * 
     * @param int $value
     */
    public function getStatusAttribute($value) {
        // Retrieve from Basedata
        $status = FiledApplicationStatus::query()->find($value)->makeHidden(['is_active']);

        return $status;
    }

    

    #region PSGC Relationship
    public function barangay() {
        return $this->belongsTo(PSGC::class);
    }

    public function city() {
        return $this->belongsTo(PSGC::class);
    }

    public function province() {
        return $this->belongsTo(PSGC::class);
    }
    #endregion

    public function status() {
        return $this->belongsTo(FiledApplicationStatus::class);
    }

    public function businesstype() {
        return $this->belongsTo(BusinessType::class);
    }

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
     * Generate Reference Number
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
     */
    public function formatOtherInformation(array $info, bool $toJson = false) {
        // Preconstruct array
        $other_info = [
            'bir' => [
                'tin' => sprintf('%09d', $info['tin'] ?? null),
                'branch_code' =>  sprintf('%05d', $info['branch_code'] ?? 0), // If head office use 0000
                'rdo' => $info['rdo_code'] ?? null, // Revenue District Code
                'taxpayer_name' => $info['taxpayer_name'] ?? null,
                'date_of_birth' => $info['date_of_birth'] ?? null
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

        /**
         * Check if Business Type is Corporation, Partnership and Cooperatives are registered under the Securities and Exchange Commission.
         */ 
        $check = BusinessType::query()->find($info['businesstype']);

        if ($check !== null) {
            if (
                in_array(
                    $check->shortname, 
                    ['CORP', 'PRTN', ['COOP']]
                )
            ) {
                $other_info['sec']['company_name'] = $info['taxpayer_name'] ?? $info['trade_name'] ?? $info['company_name'];
                $other_info['sec']['registration_number'] = $info['sec_registration_number'] ?? null;
                $other_info['sec']['date_of_incorporation'] = $info['date_of_birth'] ?? $info['date_of_incorporation'] ?? null;
            } else if (
                in_array(
                    $check->shortname, 
                    ['INDV']
                )
            ) {
                $other_info['dti']['trade_name'] = $info['trade_name'] ?? "No trade name specified.";
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
     * @param string $trade_name
     * @param array|null $other_information
     * @param int $province
     * @param int $city
     * @param int $barangay
     * @return bool|array|string
     * @throws 
     */
    public function createNewApplication(
        string $business_id, 
        string $taxpayer_name,
        string $trade_name,
        ?array $other_information = null,
        int $province,
        int $city,
        int $barangay,
        array $geomap,
        array $user,
        int $businesstype,
        int $certificatetype,
        ?array $businessline = []
    ) {
        try {
            // Application Reference Number
            $application_reference_number = $this->generateReferenceNumber();

            // Format created by
            $created_by = $this->formatCreatedByUser($user, true);

            // Format Other Information
            $other_info = $this->formatOtherInformation($other_information, true);

            // Format Geomap
            $geomap = json_encode($geomap);

            // Format Business Line
            $businessline = json_encode($businessline);

            // Filed Application Status
            try {
                $status = new FiledApplicationStatus();
                $status = $status->findByShortname('CREATED');
            } catch (ModelNotFoundException $e) {
                throw $e;
                // stop the operation
                die();
            }
            
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
                'businessline' => $businessline
            ]);

            return $save; 

            
        } catch (\Exception $e) {
            throw $e;
        }
    }
}