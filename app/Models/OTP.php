<?php 
/**
 * app/Models/OTP.php
 * @author jmquijano
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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