<?php
/**
 * app/Utility/Auth.php
 * @author jmquijano
 */
namespace App\Core\Utilities\Authentication;

use App\Models\Applicant\User;
Use App\Core\Utilities\Authentication\JsonWebToken as Jwt;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ApplicantAuthUtility {
    /**
     * Get Current User
     * @param Request $req
     */
    public static function CurrentUser($req) {
        // Check if $req is an instanceof Illuminate\Http\Request
        if ($req instanceof Request) {
            if ($req->hasHeader('Authorization')) {
                // Check JWT
                try {
                    $token = (new Jwt())->parse($req);
    
                    // Check if token has been manually revoked
                    $sub = $token['sub'] ?? null;
                    $jti = $token['jti'] ?? null;
    
                    $findUser = User::query()->find($sub);
    
                    if ($findUser) {
                        return $findUser;
                    }
                } catch (\Exception $e) {
                   
                }
            } 
        }
        
        return null;
    }

    /**
     * Has Capability
     * @param Request $req
     * @param string $code
     */
    public static function HasCapability($req, $code) {
        if ($req->hasHeader('Authorization')) {
            try {
                $token = (new Jwt())->parse($req);
                $sub = $token['sub'] ?? null;
                $jti = $token['jti'] ?? null;
                $findUser = User::query()->find($sub);

                if ($findUser) {
                    /*
                    |--------------------------------------------------------------------------
                    | Check if user has capability
                    |--------------------------------------------------------------------------
                    */
                    $check = DB::table('t_users')
                            ->join('t_users_roleassign', 't_users.SeqID', '=', 't_users_roleassign.UserID')
                            ->join('t_system_roles', 't_users_roleassign.RoleID', '=', 't_system_roles.SeqID')
                            ->join('t_system_roles_permission', 't_system_roles.SeqID', '=', 't_system_roles_permission.RoleID')
                            ->join('t_system_permission', 't_system_roles_permission.PermissionID', '=', 't_system_permission.SeqID')
                            ->where('t_users.SeqID', '=', $findUser->SeqID)
                            ->where('t_system_permission.SystemCode', '=', $code);

                    if ($check->count() >= 1) {
                        return true;
                    }
                }
            } catch (\Exception $e) {
               
            }
        } 

        return false;
    }

    /**
     * @method GetAllUserCapabilities
     */
    public static function GetAllUserCapabilities($req) {
        if ($req->hasHeader('Authorization')) {
            try {
                $token = (new Jwt())->parse($req);
                $sub = $token['sub'] ?? null;
                $jti = $token['jti'] ?? null;
                $findUser = User::query()->find($sub);

                if ($findUser) {
                    /*
                    |--------------------------------------------------------------------------
                    | Check if user has capability
                    |--------------------------------------------------------------------------
                    */
                    $check = DB::table('t_users')
                            ->join('t_users_roleassign', 't_users.SeqID', '=', 't_users_roleassign.UserID')
                            ->join('t_system_roles', 't_users_roleassign.RoleID', '=', 't_system_roles.SeqID')
                            ->join('t_system_roles_permission', 't_system_roles.SeqID', '=', 't_system_roles_permission.RoleID')
                            ->join('t_system_permission', 't_system_roles_permission.PermissionID', '=', 't_system_permission.SeqID')
                            ->where('t_users.SeqID', '=', $findUser->SeqID);

                    if ($check->count() >= 1) {
                        return $check;
                    }
                }
            } catch (\Exception $e) {
               
            }
        } 

        return null;
    }
}