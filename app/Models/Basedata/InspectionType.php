<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Inspection Type
 * @package App\Models\Basedata
 * 
 * @table basedata_inspectiontype
 * @primarykey id
 */
class InspectionType extends Model
{
    protected $table = 'basedata_inspectiontype';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * Find an item based on its primary key and the "is_active" attribute value.
     * 
     * @param int $id
     * @param bool $is_active
     */
    public function findById(int $id, bool $is_active) {
        try {
            $_q = $this->query()->where([
                'id' => $id,
                'is_active' => $is_active
            ])->firstOrFail();

            return $_q;
        } catch (ModelNotFoundException $e) {
            throw $e;
        }
    }

}
