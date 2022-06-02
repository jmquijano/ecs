<?php
 

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\Basedata\RevenueDistrictOffice as BasedataRevenueDistrictOffice;

/**
 * Revenue District Office (BIR)
 * @package App\Http\Controllers\Basedata
 */
class RevenueDistrictOffice extends Controller {
    /**
     * Get all RDO
     * 
     * @return mixed
     */
    public function get()
    {
        try {
            $fetch = BasedataRevenueDistrictOffice::all()->makeHidden(['isactive']);
            return response()->success(200, 'Revenue District Office', $fetch);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
}