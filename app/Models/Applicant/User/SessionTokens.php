<?php 

namespace App\Models\Applicant\User;

use DateTime;
use Illuminate\Database\Eloquent\Model;

/**
 * Application User Session Tokens
 * @package App\Models\Applicant\User
 * 
 * @table applicant_user_sessiontokens
 * @primarykey id
 * 
 * @fillable (string) jti - Preferrably UUID format
 * @fillable (string) jwt
 * @fillable (int) ownership
 * @fillable (json) footprint
 * @fillable (bool) is_revoked
 * @fillable (timestamptz) expires_at
 */
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

    /**
     * Store Session Token
     * 
     * @param string $jti
     * @param string $jwt
     * @param int $ownership
     * @param array $footprint
     * @param bool $is_revoked
     * @param DateTime $expires_at
     * 
     * @return void
     */
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