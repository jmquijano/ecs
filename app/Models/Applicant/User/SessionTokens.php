<?php 

namespace App\Models\Applicant\User;

use DateTime;
use Illuminate\Database\Eloquent\Model;

class SessionTokens extends Model {
    protected $table = 'applicant_user_sessiontokens';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'jti',
        'jwt',
        'ownership',
        'footprint',
        'is_revoked',
        'expires_at'
    ];

    public function store (string $jti, string $jwt, int $ownership, array $footprint, bool $is_revoked, $expires_at) {
        try {
            $this->query()->create([
                'jti' => $jti,
                'jwt' => $jwt,
                'ownership' => $ownership,
                'footprint' => json_encode($footprint),
                'is_revoked' => $is_revoked,
                'expires_at' => $expires_at
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}