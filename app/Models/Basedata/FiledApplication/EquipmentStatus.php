<?php

namespace App\Models\Basedata\FiledApplication;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * EquipmentStatus
 * @package App\Models\Basedata\FiledApplication
 * 
 * @table basedata_filedapplication_equipmentstatus
 */
class EquipmentStatus extends Model
{
    protected $table = 'basedata_filedapplication_equipmentstatus';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $hidden = [
        'is_active'
    ];
}
