<?php 
namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

/**
 * Revenue District Office
 * @package App\Models\Basedata
 * 
 * @table basedata_revenuedistrictoffice
 * @primarykey id
 */
class RevenueDistrictOffice extends Model {
    protected $table = 'basedata_revenuedistrictoffice';
    protected $primaryKey = 'id';

    public $timestamps = false;

    /**
     * Get "name" attribute value.
     * 
     * @param mixed $value
     * 
     * @return mixed
     */
    public function getNameAttribute($value) {
        return strtoupper($value);
    }
}