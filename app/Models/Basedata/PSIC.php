<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PSIC extends Model
{
    protected $table = 'basedata_psic';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function getPsicClassAttribute($value) {
        return strval(
            sprintf('%04d', $value)
        );
    }
}
