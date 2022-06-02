<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * One Time Password
 * @package App\Models
 * 
 * @table otp
 * @primarykey id
 * 
 * @fillable (string) otp - BCrypt Hashed
 * @fillable (int) mfa_communication_channel_id
 * @fillable (bool) is_revokd
 * @fillable (timestamptz) expires_at
 */
class OTP extends Model {
    protected $table = 'otp';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'otp',
        'mfa_communication_channel_id',
        'is_revoked',
        'expires_at'
    ];

}