<?php 

namespace App\Http\Controllers\Applicant\Auth;

use App\Core\Exception\Models\ExceptionModel;
use App\Core\Utilities\Authentication\ApplicantAuthUtility;
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

/**
 * Token Creation and Token Revocation.
 * 
 * @package App\Http\Controllers\Applicant\Auth
 */
class Token extends Controller {
    /**
     * Login
     * 
     * @route:post /auth/token
     * 
     * @param LoginRequest $req
     * 
     * @return mixed
     */
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

    /**
     * Get Token Information
     * 
     * @route:get /auth/token
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function GetTokenInfo(Request $req) {
        try {
            // Parse token by using Authorization Header
            $token = (new Jwt())->parse($req);

            return response()->success(
                200,
                'Token Information',
                $token
            );
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    /**
     * Logout - Revokes the token to prevent token misuse.
     * Apart from client-side token removal, invalidating the token's JTI on the backend can be useful.
     * 
     * @route:post /auth/logout
     * @route:get /auth/logout
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function Logout(Request $req) {
        try {
            // Initialize Exception Model
            $exception = new ExceptionModel();

            // If request method is POST, use the value passed on the post request parameter "access_token". 
            if (strtolower($req->method()) == 'post') {
                $token = (new Jwt())->parseByParam($req->input('access_token', ''));
            } 
            // If request method is GET, use the value passed on the Authorization header.
            else {
                $token = (new Jwt())->parse($req);
            }
            
            // Get the "jti" value in token
            $jti = $token['jti'] ?? null;

            // Find the "jti" from SessionToken
            $findJti = ApplicantSessionToken::query()->where('jti', '=', $jti);

            // Count the "jti" in $findJti, if the integer result was 0 then return an error response.
            if ($findJti->count() <= 0) {
                return response()->error(400, $exception->getMessageString('AT006A'));
                die();
            }

            // If the boolean attribute value of "is_revoked" is True then return an error message since the token has already been revoked.
            if ($findJti->get()->first()->is_revoked) {
                return response()->error(400, $exception->getMessageString('AT006B'));
                die();
            }

            // Update the boolean attribute value "is_revoked" into True. 
            // Next time if the revoked token was tried to be used again the middleware will not accept the token.
            $findJti->update([
                'is_revoked' => true
            ]);

            return response()->success(200, 'Token has been successfully revoked');
        } catch (\Exception $e) {
            // $message = 'An internal server error has occured while performing token revocation.';
            $message = $e->getMessage();
            return response()->error(500, $message);
        }
    }

    /**
     * Validate Token
     * 
     * @route:get /auth/token/validate
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function ValidateToken(Request $req) {
        try {
            return response()->success(200, 'Token is valid');
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
}