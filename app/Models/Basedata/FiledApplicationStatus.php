<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Filed Application Status
 * @package App\Models\Basedata
 * 
 * @table basedata_filedapplicationstatus
 * @primarykey id
 */
class FiledApplicationStatus extends Model
{
    protected $table = 'basedata_filedapplicationstatus';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * Get "description" attribute
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getDescriptionAttribute($value) {
        return json_decode($value);
    }

    /**
     * Find an item based on the "shortname" attribute value.
     * 
     * @param string $shortname
     * 
     * @return Illuminate\Database\Eloquent\Builder::firstOrFail
     * 
     * @throws ModelNotFoundException
     */
    public function findByShortname(string $shortname) {
        try {
            $find = $this->query()->where('shortname', '=', $shortname)->firstOrFail();

            return $find;
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("${shortname} was not found in table '" . $this->getTable() . "'.");
        }
    }
}
