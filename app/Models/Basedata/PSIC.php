<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Philippine Standard Industrial Classification
 * @package App\Models\Basedata
 * 
 * @table basedata_psic
 * @primarykey id
 */
class PSIC extends Model
{
    protected $table = 'basedata_psic';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * Get "psic_class" attribute value.
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getPsicClassAttribute($value) {
        return strval(
            sprintf('%04d', $value)
        );
    }
}
