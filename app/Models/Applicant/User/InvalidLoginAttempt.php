<?php 

namespace App\Models\Applicant\User;

use DateTime;
use Illuminate\Database\Eloquent\Model;

class InvalidLoginAttempt extends Model {
    protected $table = 'applicant_user_invalidloginattempt';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'applicant_user_id',
        'footprint',
        'is_notified'
    ];

    protected $attributes = [
        'is_notified' => false
    ];

    /**
     * Store Invalid Login Attempt as Log
     * 
     * @param int $applicant_user_id
     * @param mixed $footprint
     * @param bool $is_notified
     * @return bool
     */
    public function store(int $applicant_user_id, mixed $footprint) {
        $footprint = json_encode($footprint);

        try {
            $insert = $this->query()->create([
                'applicant_user_id' => $applicant_user_id,
                'footprint' => $footprint,
                'is_notified' => false
            ]);

            return true;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}