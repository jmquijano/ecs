<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Equipments
 * 
 * @package App\Models\Basedata
 * 
 * @table basedata_equipments
 * @primarykey id
 * 
 * @fillable (varchar) shortname
 * @fillable (varchar) fullname
 * @fillable (bool) is_active
 */
class Equipments extends Model
{
    protected $table = 'basedata_equipments';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = [
        'shortname',
        'fullname',
        'is_active'
    ];

    protected $hidden = [
        'is_active'
    ];
}
