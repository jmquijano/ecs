<?php 
/**
 * app/Models/Boundaries/GeoPath.php
 * @author jmquijano
 */
namespace App\Models\Boundaries;

use Illuminate\Database\Eloquent\Model;

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