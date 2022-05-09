<?php

namespace App\Models\Applicant\User;

use Illuminate\Database\Eloquent\Model;

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
