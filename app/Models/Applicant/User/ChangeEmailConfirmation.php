<?php

namespace App\Models\Applicant\User;

use Illuminate\Database\Eloquent\Model;

/**
 * Change Email Confirmation
 * @package App\Models\Applicant\User
 * 
 * @table applicant_user_changeemailconfirmation
 * @primarykey id
 * 
 * @fillable (int) applicant_user_id
 * @fillable (string) emailaddress
 * @fillable (int) otp_id
 * @fillable (bool) is_confirmed
 * @fillable (timestamptz) expires_at
 */
class ChangeEmailConfirmation extends Model
{
    protected $table = 'applicant_user_changeemailconfirmation';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'applicant_user_id',
        'emailaddress',
        'otp_id',
        'is_confirmed',
        'expires_at'
    ];
}
