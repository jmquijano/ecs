<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\Basedata\InspectionType as BasedataInspectionType;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

/**
 * Controller for Inspection Type (Base Data)
 * @package App\Http\Controllers\Basedata
 */
class InspectionType extends Controller
{
    /**
     * Get Inspection Type
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function getAll(Request $req) {
        try {
            // Query
            $_q = BasedataInspectionType::query();

            if (!filter_var($req->get('show_inactive', FILTER_VALIDATE_BOOLEAN))) {
                $_q->where('is_active', '=', true);  
            }

            if ($_q->count() <= 0) {
                throw new ModelNotFoundException("One or more of Inspection Type couldn't be found.");
            }

            return response()->success(200, 'Inspection Type', $_q->get());
        } catch (ModelNotFoundException $nf) {
            return response()->error(404, $nf->getMessage());
        } catch (\Exception $e) {
            return response()->error(500, 'An error has occured while fetching Inspection Type.');
        }
    }
}
