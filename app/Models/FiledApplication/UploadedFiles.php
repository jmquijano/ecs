<?php

namespace App\Models\FiledApplication;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Uploaded Files
 * @package App\Models\FiledApplication
 * 
 * @table filedapplication_uploadedfiles
 * @primarykey id
 * 
 * @fillable (int) filedapplication
 * @fillable (int) doctype
 * @fillable (json) context
 * @fillable (json) created_by
 */
class UploadedFiles extends Model
{
    protected $table = 'filedapplication_uploadedfiles';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = [
        'filedapplication',
        'doctype',
        'context',
        'created_by'
    ];

    protected $appends = [
        'original_context_path',
        'context_file'
    ];

    public function getContextAttribute($value) {
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

    public function getOriginalContextPathAttribute() {
        return json_decode($this->attributes['context'])->path ?? null;
    }

    public function getContextFileAttribute() {
        return json_decode($this->attributes['context'])->file ?? null;
    }    

    public function getCreatedByAttribute($value) {
        return json_decode($value);
    }
}
