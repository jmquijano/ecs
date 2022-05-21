<?php


namespace App\Providers;


use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\ServiceProvider;

class ResponseServiceProvider extends ServiceProvider
{
    public function boot(ResponseFactory $factory)
    {
        $factory->macro('success', function (int $statusCode, $message = null, $data = null, $otherParams = null) use ($factory) {
            

            $format = [];

            if ($statusCode >= 200 && $statusCode <= 299) {
                $format['code'] = $statusCode;
            } else {
                $format['code'] = 200;
            }

            $format['success'] = true;

            if ($message !== null) {
                $format['message'] = $message;
            }

            if ($data !== null) {
                $format['data'] = $data;
            }

            if (is_array($otherParams)) {
                foreach ($otherParams as $k => $v) {
                    $format[$k] = $v;
                }
            }

            return $factory->make($format, $statusCode);
        });

        $factory->macro('error', function (int $statusCode, $message = null, $data = null) use ($factory){
            

            $format = [];

            if ($statusCode >= 400 && $statusCode <= 599) {
                $format['code'] = $statusCode;
            } else {
                $format['code'] = 400;
            }

            $format['success'] = false;

            if ($message !== null) {
                $format['message'] = $message;
            }

            if ($data !== null) {
                $format['errordata'] = $data;
            }

            return $factory->make($format, $statusCode);
        });
    }

    public function register()
    {
        //
    }
}