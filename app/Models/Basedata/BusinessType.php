<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BusinessType extends Model
{
    protected $table = 'basedata_businesstype';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function findByShortname(string $shortname) {
        try {
            $find = $this->query()->where('shortname', '=', $shortname)->firstOrFail();

            return $find;
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("${shortname} was not found in table '" . $this->getTable() . "'.");
        }
    }
}
