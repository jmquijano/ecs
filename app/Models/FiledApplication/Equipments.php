<?php

namespace App\Models\FiledApplication;

use App\Core\Utilities\Account\IdentifyUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Equipments
 * @package App\Models\FiledApplication
 * 
 * @table filedapplication_equipments
 * @primarykey id
 * 
 * @fillable (int) filedapplication
 * @fillable (int) equipment
 * @fillable (json) context
 * @fillable (bool) status
 * @fillable (json) created_by
 */
class Equipments extends Model
{
    protected $table = 'filedapplication_equipments';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = [
        'filedapplication',
        'equipment',
        'context',
        'status',
        'created_by'
    ];

    public function equipment()
    {
        return $this->belongsTo('App\Models\Basedata\Equipments', 'equipment');
    }

    public function attachments()
    {
        return $this->hasMany('App\Models\FiledApplication\Equipments\Attachments', 'filedapplication_equipment');
    }

    public function filedapplication()
    {
        return $this->belongsTo('App\Models\FiledApplication', 'filedapplication');
    }

    public function status() 
    {
        return $this->belongsTo('App\Models\Basedata\FiledApplication\EquipmentStatus', 'status');
    }

    public function getCreatedByAttribute($value) {
        $value = json_decode($value, true);
        return (new IdentifyUser)->createdBy($value);
    }

    public function getContextAttribute($value) {
        return json_decode($value, true);
    } 
}
