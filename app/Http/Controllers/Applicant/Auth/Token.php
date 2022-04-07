<?php 

namespace App\Http\Controllers\Applicant\Auth;

use App\Core\Exception\Models\ExceptionModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\Auth\Login\LoginRequest;
use App\Models\Applicant\Config as ApplicantConfig;
use App\Models\Applicant\User as ApplicantUser;
use App\Models\Applicant\User\InvalidLoginAttempt;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Core\Utilities\Authentication\JsonWebToken as Jwt;
use App\Models\Applicant\User\SessionTokens as ApplicantSessionToken;
use App\Core\Utilities\Http\ClientRequestFootprint;
use Carbon\Carbon;

class Token extends Controller {
    public function Login(LoginRequest $req) {
        try {
            // Initialize Exception Model
            $exception = new ExceptionModel();

            // Applicant User
            $user = (new ApplicantUser())->findUserIdentifier($req->username)->get()->first();
            
            // Get Hashed Password Value
            $hashed_password = $user->password;

            // Check if password is correct
            $check_password = Hash::check($req->password, $hashed_password);
            if (!$check_password) {
                // Store Invalid Login Attempt
                $invalid_login_attempt = new InvalidLoginAttempt();
                $s = $invalid_login_attempt->store(
                    $user->id,
                    (new ClientRequestFootprint($req))->footprint
                );

                return response()->error(400, 'Invalid Password', [
                    'password' => [
                        $exception->getMessageString('AT001B')
                    ]
                ]);
                die();
            }

            // Generate JWT
            $token = (new Jwt())
            ->issuer('ECS Authenticator')
            ->subject($user->id)
            ->payload(['id' => $user->id])
            ->expire(env('AUTH_TOKEN_TTL'))
            ->Create();

            // Store JWT
            $store_jwt = (new ApplicantSessionToken())->store(
                $token->jti,
                $token->token,
                $user->id,
                (new ClientRequestFootprint($req))->footprint,
                false,
                Carbon::createFromTimestamp($token->expires_in)->toDateTimeString()
            );

            return response()->success(
                200, 
                'Successful Authentication', 
                [
                    'access_token' => $token->token,
                    'token_type' => 'bearer',
                    'expires_in' => $token->expires_in
                ]
            );
        } catch (HttpResponseException $e) {
            return $e;
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    public function ValidateToken(Request $req) {
        try {
            return response()->success(200, 'Token is valid');
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
}