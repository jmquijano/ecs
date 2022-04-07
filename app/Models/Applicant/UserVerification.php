<?php 
/**
 * app/Models/Applicant/UserVerification.php 
 * @author jmquijano
 */

namespace App\Models\Applicant;

use Illuminate\Database\Eloquent\Model;

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