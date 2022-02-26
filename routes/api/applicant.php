<?php

use App\Http\Controllers\Applicant\Auth\Enrollment;
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
     * Registration
     */
    Route::prefix('enrollment')->group(function () {
        Route::post('/', [Enrollment::class, 'Details']);
    });
});