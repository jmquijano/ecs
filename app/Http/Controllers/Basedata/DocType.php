<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\Basedata\DocType as BasedataDocType;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class DocType extends Controller
{
    /**
     * Get Document Type
     * 
     * @param Request
     * 
     * @return mixed
     */
    public function getAll(Request $req) {
        try {
            // Query
            $_q = BasedataDocType::query();

            if (!filter_var($req->get('show_inactive', FILTER_VALIDATE_BOOLEAN))) {
                $_q->where('is_active', '=', true);
            }

            if ($_q->count() <= 0) {
                throw new ModelNotFoundException("One or more of Document Type couldn't be found.");
            }

            return response()->success(200, 'Document Type', $_q->get());
        } catch (ModelNotFoundException $nf) {
            return response()->error(404, $nf->getMessage());
        } catch (\Exception $e) {
            return response()->error(500, 'An error has occured while fetching Inspection Type.');
        }
    }
}
