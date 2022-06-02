<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\Basedata\BusinessType as BasedataBusinessType;
use Illuminate\Http\Request;

/**
 * Business Type
 * @package App\Http\Controllers\Basedata
 */
class BusinessType extends Controller
{
    public function getAll(Request $req) {
        try {
            // Query
            $q = BasedataBusinessType::query();

            if (!filter_var($req->get('show_inactive', FILTER_VALIDATE_BOOLEAN))) {
                $q->where('is_active', '=', true);  
            }

            $q->orderBy('id', 'ASC');

            return response()->success(200, 'Business Type', $q->get());
        } catch (\Exception $e) {
            return response()->error(500, 'An error has occured while fetching Business Type.');
        }
    }
}
