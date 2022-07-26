<?php

use App\Http\Controllers\Applicant\Auth\Registration;
use App\Http\Controllers\Applicant\Auth\Token;
use App\Http\Controllers\Applicant\Dashboard;
use App\Http\Controllers\Applicant\User;
use App\Http\Controllers\Basedata\RevenueDistrictOffice;
use App\Http\Controllers\Boundaries;
use App\Http\Controllers\Applicant\Application;
use App\Http\Controllers\Basedata\BusinessType;
use App\Http\Controllers\Basedata\CertificateType;
use App\Http\Controllers\Basedata\DocType;
use App\Http\Controllers\Basedata\InspectionType;
use App\Http\Controllers\Basedata\MFACommunicationChannel;
use App\Http\Controllers\Basedata\PSIC;
use App\Utility\SMS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
 
/**
 * Map Boundaries Endpoints
 */
Route::prefix('boundaries')->group(function () {
    Route::get('/province', [Boundaries::class, 'Provinces']);
    Route::get('/city', [Boundaries::class, 'Cities']);
    Route::get('/barangay', [Boundaries::class, 'Barangays']);
});

/**
 * Base Data Endpoints
 */
Route::prefix('basedata')->group(function () {
    /**
     * BIR Revenue District Office
     */
    Route::get('/rdo', [RevenueDistrictOffice::class, 'Get']);

    /**
     * Philippine Standard Industrial Classification Code (PSIC) Endpoints
     */
    Route::prefix('psic')->group(function () {
        Route::get('/', [PSIC::class, 'GetWithSearch']);
        Route::get('/{id}', [PSIC::class, 'getById']);
    });

    /**
     * MFA Communication Channel
     */
    Route::prefix('mfa-channels')->group(function () {
        Route::get('/', [MFACommunicationChannel::class, 'getActiveChannels']);
    });

    /**
     * Certificate Type
     */
    Route::get('/certificate-type', [CertificateType::class, 'getAll']);
    /**
     * Business Type
     */
    Route::get('/business-type', [BusinessType::class, 'getAll']);

    /**
     * Inspection Type
     */
    Route::get('/inspection-type', [InspectionType::class, 'getAll']);

    /**
     * Document Type
     */
    Route::get('/document-type', [DocType::class, 'getAll']);
});

/**
 * Authentication Endpoints
 */
Route::prefix('auth')->group(function () {
    // Token
    Route::post('/token', [Token::class, 'Login'])->middleware(['captchaguard']);
    Route::get('/token', [Token::class, 'GetTokenInfo'])->middleware(['authguard.applicant']);
    Route::get('/token/validate', [Token::class, 'ValidateToken'])->middleware(['authguard.applicant']);

    // Logout
    Route::post('/token/revoke', [Token::class, 'Logout']);
    Route::get('/token/revoke', [Token::class, 'Logout'])->middleware(['authguard.applicant']);

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
 * User
 */
Route::prefix('user')->group(function () {
    // Fetch User Profile
    Route::get('/{id}', [User::class, 'GetProfile'])->middleware(['authguard.applicant']);

    // Edit User Profile
    Route::put('{id}', [User::class, 'EditBasicProfile'])->middleware(['authguard.applicant']);

    // Change Password
    Route::put('{id}/password', [User::class, 'ChangePassword'])->middleware(['authguard.applicant']);

    // Change Email (Subject for further confirmation)
    Route::post('{id}/emailaddress', [User::class, 'ChangeEmail'])->middleware(['authguard.applicant']);

    // Confirm Change Email
    Route::put('{id}/emailaddress', [User::class, 'ChangeEmailConfirm'])->middleware(['authguard.applicant']);

    // Change Mobile Number (Subject for further confirmation)
    Route::post('{id}/mobilenumber', [User::class, 'ChangeMobileNumber'])->middleware(['authguard.applicant']);

    // Change Mobile Number
    Route::put('{id}/mobilenumber', [User::class, 'ChangeMobileNumberConfirm'])->middleware(['authguard.applicant']);
});

/**
 * Dashboard Widgets Endpoints
 */
Route::prefix('dashboard')->group(function () {
    // Counter
    Route::get('/widget/counter', [Dashboard::class, 'WidgetCounter'])->middleware(['authguard.applicant']);
});

/**
 * Application Endpoint
 */
Route::prefix('application')->middleware(['authguard.applicant'])->group(function () {
    // Create New Application
    Route::post('/', [Application::class, 'Create']);

    // Get Application
    Route::get('/', [Application::class, 'GetAll']);

    // Get Application by ID
    Route::get('/{id}', [Application::class, 'GetById']);

    // Update Application by ID
    Route::put('/{id}', [Application::class, 'UpdateApplication']);

    // Upload File
    Route::post('/{id}/file', [Application::class, 'UploadFile']);

    // Get Uploaded Files
    Route::get('/{id}/file', [Application::class, 'GetUploadedFiles']);

    // Get Uploaded File by ID
    Route::get('/{id}/file/{file_id}', [Application::class, 'GetUploadedFileById']);

    // Delete Uploaded File by ID
    Route::delete('/{id}/file/{file_id}', [Application::class, 'DeleteUploadedFileById']);

    // Add New Equipment
    Route::post('/{id}/equipment', [Application::class, 'AddEquipment']);

    // Get Equipment
    Route::get('{id}/equipment', [Application::class, 'GetEquipment']);
});

/**
 * Tests
 */
/*
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
}); */