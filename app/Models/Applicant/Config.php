<?php 

namespace App\Models\Applicant;

use App\Core\Exception\Models\ExceptionModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Config extends Model {
    protected $table = 'applicant_config';
    protected $primaryKey = 'id';
    public $timestamps = false;
    

    protected $fillable = [
        'key',
        'value',
        'value_type'
    ];

    /**
     * Get config value by key
     * 
     * @return mixed
     */
    public function get(?string $key = null) : mixed {
        try {
            // Find Key
            $query = $this->query()->where('key', '=', $key)->firstOrFail();

            // Value
            $value = null;

            switch ($query->value_type) {
                case "boolean":
                    $value = boolval($query->value);
                    break;
                case "int":
                    $value = intval($query->value);
                    break;
                default:
                    $value = $query->value; // as string
                break;
            }

            return $value;
        } catch (ModelNotFoundException $e) {
            $exception = new ExceptionModel();
            return $exception->getMessageString(
                'ST001A', 
                [
                    'Key' => $key
                ]
            );
        }
    }
}