<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\Basedata\Equipments as BasedataEquipments;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class Equipments extends Controller
{
    /**
     * Get Equipment
     * 
     * @param Request
     * 
     * @return mixed
     */
    public function getAll(Request $req) {
        try {
            // Query
            $_q = BasedataEquipments::query();

            if (!filter_var($req->get('show_inactive', FILTER_VALIDATE_BOOLEAN))) {
                $_q->where('is_active', '=', true);
            }

            if ($_q->count() <= 0) {
                throw new ModelNotFoundException("Equipment couldn't be found.");
            }

            return response()->success(200, 'Equipment Type', $_q->get());
        } catch (ModelNotFoundException $nf) {
            return response()->error(404, $nf->getMessage());
        } catch (\Exception $e) {
            return response()->error(500, 'An error has occured while fetching Equipment.');
        }
    }
}
