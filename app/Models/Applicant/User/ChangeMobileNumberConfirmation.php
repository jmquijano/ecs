<?php

namespace App\Models\Applicant\User;

use Illuminate\Database\Eloquent\Model;

/**
 * Change Mobile Number Confirmation
 * @package App\Models\Applicant\User
 * 
 * @table applicant_user_changemobilenumberconfirmation
 * @primarykey $id
 * 
 * @fillable (int) applicant_user_id
 * @fillable (string) mobilenumber
 * @fillable (int) otp_id
 * @fillable (bool) is_confirmed
 * @fillable (timestamptz) expires_at
 */
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
