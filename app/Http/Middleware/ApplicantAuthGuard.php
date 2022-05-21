<?php

namespace App\Http\Middleware;

use App\Models\Applicant\User\SessionTokens as ApplicantSessionTokens;
use Closure;
use Illuminate\Http\Request;
use App\Core\Utilities\Authentication\JsonWebToken as Jwt;

class ApplicantAuthGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {  
        if ($request->hasHeader('Authorization')) {
            // Check JWT
            try {
                $token = (new Jwt())->parse($request);

                // Check if token has been manually revoked
                $jti = $token['jti'] ?? null;
                $checkTokenRevocation = ApplicantSessionTokens::where('jti', '=' , $jti)->where('is_revoked', '=' , false)->get();

                if ($checkTokenRevocation->count() >= 1) {
                    return $next($request);
                } else {
                    //var_dump($checkTokenRevocation->count());
                    return response()->error(401, 'Token has already been manually revoked.');
                }

            } catch (\Exception $e) {
                if ($e instanceof \PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException){
                    return response()->error(401, 'Malformed Token');
                }else if ($e instanceof \PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException){
                    return response()->error(401, 'Expired Token');
                } else if ( $e instanceof \PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException) {
                    return response()->error(401, $e->getMessage());
                }else{
                    return response()->error(401, $e->getMessage());
                }
            }

            // Continue with next request
            // return $next($request);
        } else {
            return response()->error(401, 'Your session had expired or is non-existent.');
        }
        // return $next($request);
    }
}
