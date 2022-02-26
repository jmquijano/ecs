<?php 

namespace App\Models\Boundaries;

use Illuminate\Database\Eloquent\Model;

class PSGC extends Model {
    protected $table = 'boundaries_psgc';
    protected $primaryKey = 'id';

    public $timestamps = false;

    public function getNameAttribute($value) {
        return strtoupper($value);
    }

   
}