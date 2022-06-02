<?php

namespace App\Models\Applicant\User;

use Illuminate\Database\Eloquent\Model;

/**
 * Change Password Log
 * @package App\Models\Applicant\User
 * 
 * @table applicant_user_changepasswordlog
 * @primarykey id
 * 
 * @fillable (int) applicable_user_id
 * @fillable (string) password - BCrypt Hash Value
 */
class ChangePasswordLog extends Model
{
    protected $table = 'applicant_user_changepasswordlog';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'applicant_user_id',
        'password'
    ];

}
