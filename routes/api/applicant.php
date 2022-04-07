<?php

use App\Http\Controllers\Applicant\Auth\Registration;
use App\Http\Controllers\Applicant\Auth\Token;
use App\Http\Controllers\Basedata\RevenueDistrictOffice;
use App\Http\Controllers\Boundaries;
use App\Utility\SMS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
 
/**
 * Map Boundaries
 */
Route::prefix('boundaries')->group(function () {
    Route::get('/province', [Boundaries::class, 'Provinces']);
    Route::get('/city', [Boundaries::class, 'Cities']);
    Route::get('/barangay', [Boundaries::class, 'Barangays']);
});

/**
 * Base Data
 */
Route::prefix('basedata')->group(function () {
    Route::get('/rdo', [RevenueDistrictOffice::class, 'Get']);
});

/**
 * Authentication
 */
Route::prefix('auth')->group(function () {
    // Token
    Route::post('/token', [Token::class, 'Login']);
    Route::get('/token/validate', [Token::class, 'ValidateToken'])->middleware(['authguard.applicant']);

    // Registration
    Route::post('/register', [Registration::class, 'Register']);

    // Parameter Check
    Route::post('/register/check', [Registration::class, 'ParameterCheck']);

    // Check Token issued during Registration
    Route::get('/register/token', [Registration::class, 'IsTokenRegistration'])->middleware(['authguard.applicant']);

    // Check Verification Status
    Route::get('/verification', [Registration::class, 'CheckVerificationStatus'])->middleware(['authguard.applicant']);

    // Verify SMS
    Route::post('/verification/sms', [Registration::class, 'VerifySms'])->middleware(['authguard.applicant']);

    // Verify Email
    Route::post('/verification/email', [Registration::class, 'VerifyEmail'])->middleware(['authguard.applicant']);

    // Resend SMS
    Route::get('/verification/sms/resend', [Registration::class, 'ResendSms'])->middleware(['authguard.applicant']);

    // Resend Email
    Route::get('/verification/email/resend', [Registration::class, 'ResendEmail'])->middleware(['authguard.applicant']);


});

/**
 * Tests
 */
Route::prefix('test')->group(function () {
    Route::post('/sms', function (Request $req) {
        // SMS
        try {
            $sms = (new SMS())
            ->body($req->input('message', 'Sent from test'))
            ->sender('SMS_API_SenderID_1')
            ->recipient($req->input('to'))
            ->build();

            return response()->success(200, 'Okay');
        } catch (\Exception $e) {
            return response()->success(200, $e->getMessage());
        }
        

        
    });
});