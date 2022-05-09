<?php

namespace App\Models\Applicant\User;

use Illuminate\Database\Eloquent\Model;

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
