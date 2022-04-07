<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use Symfony\Component\HttpFoundation\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Reveal client IP address behind any reverse proxy service such as CloudFlare or Incapsula/Imperva. (Added on 03/19/2022 by jmquijano)
        Request::setTrustedProxies(['REMOTE_ADDR'], Request::HEADER_X_FORWARDED_FOR);

        // Log SQL and Response Time
        DB::listen(function($query) {
            Log::info(
                $query->sql . ' ' . $query->time
            );
        });
    }
}
