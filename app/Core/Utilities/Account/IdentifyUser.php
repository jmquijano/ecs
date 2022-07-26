<?php 

namespace App\Core\Utilities\Account;

use App\Models\Applicant\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class IdentifyUser {
    public function createdBy($value) {
        $userType = strtolower($value['type']);

        // Response format
        $response = [];

        switch ($userType) {
            case 'applicant':
                try {
                    // Get Applicant User
                    $response = User::query()
                        ->findOrFail(
                            $value['user_id'], 
                            [
                                'id', 
                                'username', 
                                'firstname', 
                                'middlename', 
                                'lastname', 
                                'salutation'
                            ]
                        );
                    $response['type'] = 'applicant';
                } catch (ModelNotFoundException $e) {
                    
                }
                
            case 'employee':
                try {
                    // Get Employee User
                } catch (ModelNotFoundException $e) {
                    
                }
            default:
                break;
        }

        return $response;
    }
}