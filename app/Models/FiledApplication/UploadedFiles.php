<?php

namespace App\Models\FiledApplication;

use App\Http\Resources\FiledApplication\GetFilesByApplicationIdResource;
use Aws\S3\Exception\S3Exception;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
        
    ];

    public $makeFileLinkVisible;

    public function getOriginalContextAttribute($value) {
        $value = json_decode($this->attributes['context']);

        return $value->path ?? null;
    }

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

    public function getCreatedByAttribute($value) {
        return json_decode($value);
    }

    public function getFilelinkAttribute() {        
        $file = json_decode($this->attributes['context'])->path ?? null;
        if (isset($file)) {
            if (Storage::disk('s3')->exists($file)) {
                $file = urldecode(
                    Storage::temporaryUrl(
                        $file, now()->addHours(1)
                    )
                );
            } else {
                $file = null;
            }
        }
        

        return $file;
    }

    /**
     * Get Files by Application ID
     * 
     * @param int $id
     * @param bool|null $withFileLink - Make
     */
    public function getFilesByApplicationId(int $id, ?bool $withFileLink = true) {
        try {
            $query = $this->query()->where([
                'filedapplication' => $id
            ])->orderBy('created_at', 'DESC');

            if ($query->count() <= 0) {
                throw new ModelNotFoundException("No file found.");
            }

            $query = $query->get(['id', 'context', 'created_by']);

            if ($withFileLink) {
                $query->append('filelink');
            }

            return $query->makeHidden(['context.path']);
            
        } catch (ModelNotFoundException $e) {
            throw $e;
        }
    }
    
}
