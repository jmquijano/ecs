<?php 
namespace App\Models\Boundaries;

use Illuminate\Database\Eloquent\Model;

/**
 * Geographical Path of PSGC
 * @package App\Models\Boundaries
 * 
 * @table boundaries_geopath
 * @primarykey id
 * 
 * @fillable (int) boundaries_psgc_id
 * @fillable (float) longitude
 * @fillable (float) latitude
 */
class GeoPath extends Model {
    protected $table = 'boundaries_geopath';
    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'boundaries_psgc_id',
        'longitude',
        'latitude'
    ];
}