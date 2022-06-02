<?php 
namespace App\Models\Applicant;

use Illuminate\Database\Eloquent\Model;

/**
 * User Verification
 * @package App\Models\Applicant
 * 
 * @table applicant_user_verification
 * @primarykey id
 * 
 * @fillable (int) applicant_user_id
 * @fillable (int) otp_id
 * @fillable (int) mfa_communication_channel_id
 * @fillable (bool) is_verified
 * @fillable (timestamptz) expires_at
 */
class UserVerification extends Model {
    protected $table = 'applicant_user_verification';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'applicant_user_id',
        'otp_id',
        'mfa_communication_channel_id',
        'is_verified',
        'expires_at'
    ];
}