<?php

namespace App\Http\Middleware;

use App\Core\Exception\Models\ExceptionModel;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CaptchaGuard
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
        $isEnabled = filter_var(env('HCAPTCHA_ENABLED', FILTER_VALIDATE_BOOLEAN));

        if ($isEnabled) {
            if ($request->input('captcha') !== null) {
                $hcaptcha = [
                    'secret' => env('HCAPTCHA_SECRET'),
                    'response' => $request->input('captcha')
                ];
    
                $restCall = Http::asForm()->post(env('HCAPCTHA_ENDPOINT'), $hcaptcha)->json();
                
                // dd($restCall);

                $isSuccess = filter_var($restCall['success'] ?? false, FILTER_VALIDATE_BOOLEAN);
                if ($isSuccess) {
                    return $next($request);
                } else {
                    return response()->error(401, 'CAPTCHA Error.', [
                        'captcha' => (new ExceptionModel())->getMessageString('AT900A')
                    ]);
                }
            } else {
                return response()->error(401, 'CAPTCHA Error.', [
                    'captcha' => (new ExceptionModel())->getMessageString('AT900A')
                ]);
            }
        } else {
            return $next($request);
        }
        
    }
}
