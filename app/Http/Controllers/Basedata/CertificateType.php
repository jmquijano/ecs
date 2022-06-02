<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\Basedata\CertificateType as BasedataCertificateType;
use Illuminate\Http\Request;

/**
 * Certificate Type
 * @package App\Http\Controllers\Basedata
 */
class CertificateType extends Controller
{
    /**
     * Get Certificate Types
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function getAll(Request $req) {
        try {
            // Query
            $q = BasedataCertificateType::query();

            if (!filter_var($req->get('show_inactive', FILTER_VALIDATE_BOOLEAN))) {
                $q->where('is_active', '=', true);  
            }

            return response()->success(200, 'Certificate Type', $q->get());
        } catch (\Exception $e) {
            return response()->error(500, 'An error has occured while fetching Certificate Type.');
        }
    }
}
