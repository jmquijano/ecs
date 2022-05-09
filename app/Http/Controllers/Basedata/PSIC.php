<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\Basedata\PSIC as BasedataPSIC;
use Illuminate\Http\Request;

class PSIC extends Controller
{
    public function getWithSearch(Request $req) {
        try {
            // Record Limit
            $limit = (
                $req->get('limit') >= 10 ? 10 : (
                    $req->get('limit') <=0 ? 1 : intval($req->get('limit'))
                )
            );

            // keyword
            $keyword = $req->get('keyword');

            // Fetch
            $fetch = BasedataPSIC::query()->orWhere('psic_industry_description', 'ilike', '%' . $keyword . '%')
                    ->orWhere('psic_class', 'LIKE', '%' . $keyword . '%')
                    ->paginate($limit)
                    ->getCollection();

            return response()->success(
                200,
                'PSIC',
                $fetch
            );
    
        } catch (\Exception $e) {
            return response()->error(
                500,
                'An internal server error has occured while fetching PSIC'
            );
        }
    } 
}
