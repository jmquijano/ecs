<?php

use App\Http\Controllers\Applicant\Auth\Registration;
use App\Http\Controllers\Applicant\Auth\Token;
use App\Http\Controllers\Basedata\RevenueDistrictOffice;
use App\Http\Controllers\Boundaries;
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
    /**
     * Login & Tokens
     */
    Route::prefix('token')->group(function () {
        Route::post('/', [Token::class, 'Login']);
        Route::get('/validate', [Token::class, 'ValidateToken']);
    });

    /**
     * Registration
     */
    Route::prefix('registration')->group(function () {
        Route::post('/otp', [Registration::class, 'CreateOTP']);
    });
});