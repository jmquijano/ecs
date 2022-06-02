<?php 
/**
 * app/Models/Boundaries/PSGC.php 
 * @author jmquijano
 */
namespace App\Models\Boundaries;

use Illuminate\Database\Eloquent\Model;

/**
 * Philippine Standard Geographic Code (PSGC)
 * @package App\Models\Boundaries
 * 
 * @table boundaries_psgc
 * @primarykey id
 */
class PSGC extends Model {
    protected $table = 'boundaries_psgc';
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