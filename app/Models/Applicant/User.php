<?php 
/**
 * app/Models/Applicant/User.php
 * @author jmquijano
 */
namespace App\Models\Applicant;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class User extends Model {
    protected $table = 'applicant_user';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'username',
        'password',
        'firstname',
        'middlename',
        'lastname',
        'emailaddress',
        'mobilenumber',
        'salutation',
        /** 
         * A boolean that determines whether the account has been deactivated by admin, 
         * by default this must be set to true which means that the account is activated by default
         * */
        'is_active',
        // A boolean that determines whether the user had already verified the email address
        'is_emailaddress_verified',
        // A boolean that determines whether the user had already verified the mobile address
        'is_mobilenumber_verified',
        // A boolean that determines whether the user had enabled two-factor authentication
        'is_mfa_enabled'
    ];

    /**
     * Find User
     * 
     * @return Model
     */
    public function findUserIdentifier(string $user) : mixed {
        try {
            $query = $this->query()
                ->where('username', '=', $user)
                ->orWhere('mobilenumber', '=', $user)
                ->orWhere('emailaddress', '=', $user);

            return $query;
        } catch (ModelNotFoundException $e) {
            throw $e;
        }
    }

}