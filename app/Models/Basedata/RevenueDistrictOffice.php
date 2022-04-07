<?php 
/**
 * app/Models/Basedata/RevenueDistrictOffice.php 
 * @author jmquijano
 */
namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class RevenueDistrictOffice extends Model {
    protected $table = 'basedata_revenuedistrictoffice';
    protected $primaryKey = 'id';

    public $timestamps = false;

    public function getNameAttribute($value) {
        return strtoupper($value);
    }
}