<?php

namespace App\Models\Applicant\User;

use Illuminate\Database\Eloquent\Model;

class ChangeMobileNumberConfirmation extends Model
{
    protected $table = 'applicant_user_changemobilenumberconfirmation';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'applicant_user_id',
        'mobilenumber',
        'otp_id',
        'is_confirmed',
        'expires_at'
    ];
}
