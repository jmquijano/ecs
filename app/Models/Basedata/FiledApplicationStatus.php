<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class FiledApplicationStatus extends Model
{
    protected $table = 'basedata_filedapplicationstatus';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public $description_index = null;

    /**
     * Get "description" attribute
     */
    public function getDescriptionAttribute($value) {
        return json_decode($value);
    }


    public function findByShortname(string $shortname) {
        try {
            $find = $this->query()->where('shortname', '=', $shortname)->firstOrFail();

            return $find;
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("${shortname} was not found in table '" . $this->getTable() . "'.");
        }
    }
}
