<?php

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
