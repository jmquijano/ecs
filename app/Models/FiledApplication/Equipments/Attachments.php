<?php

namespace App\Models\FiledApplication\Equipments;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Attachments
 * @package App\Models\FiledApplication\Equipments
 * 
 * @table filedapplication_equipments_attachments
 * @primarykey id
 * 
 * @fillable (int) filedapplication_equipment
 * @fillable (json) context
 * @fillable (json) created_by
 */
class Attachments extends Model
{
    protected $table = 'filedapplication_equipments_attachments';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = [
        'filedapplication_equipment',
        'context',
        'created_by'
    ];

    public function getContextAttribute($value) {
        /* $value = json_decode($value);
        return $value; */
        $value = json_decode($value);
        if (isset($value->path)) {
            if (Storage::disk('s3')->exists($value->path)) {
                $value->path = urldecode(
                    Storage::temporaryUrl(
                        $value->path, now()->addHours(1)
                    )
                );
            } else {
                $value->path = null;
            }
        }

        return $value;
    }
}
