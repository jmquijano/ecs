<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Model;

/**
 * Document Type
 * @package App\Models\Basedata
 */
class DocType extends Model
{
    protected $table = 'basedata_doctype';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * Get "accepted_file_extension" attribute value.
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getAcceptedFileExtensionAttribute($value) {
        return json_decode($value);
    }
}
