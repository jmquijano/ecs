<?php

namespace App\Rules;

use App\Core\Exception\Models\ExceptionModel;
use App\Models\Applicant\Config as ApplicantConfig;
use App\Models\Applicant\User as ApplicantUser;
use App\Models\Applicant\User\InvalidLoginAttempt;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ApplicantUserBadLogin implements Rule
{
    protected string $value;
    protected string $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
        $this->message = '';
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $validation_state = false;
        try {
            // Initialize ApplicantConfig
            $config = new ApplicantConfig();

            // Check if Bad Login Guard has been enabled in Config
            $is_enabled = $config->get('badloginguard:enabled');

        if ($is_enabled) {
            // Bad Login count
            $config_bad_login_count = $config->get('badloginguard:maxcount');

            // Bad login threshold
            $threshold = $config->get('badloginguard:timethreshold');

            // Exception message
            $exception = new ExceptionModel();

            // Time between
            $time_between = [
                Carbon::now()->subSeconds($threshold), // offset negative
                Carbon::now() // until
            ];

            try {
                // Find user
                $find_user = (new ApplicantUser())->findUserIdentifier($value)->firstOrFail();
            } catch (ModelNotFoundException $e) {
                $this->message = ' ';
            }
            

            // Invalid login attempts lookup
            $invalid_login_attempt = InvalidLoginAttempt::query()->where('applicant_user_id', '=', $find_user->id)->whereBetween('created_at', $time_between);

            
            if ($invalid_login_attempt->count() <= $config_bad_login_count) {
                $validation_state = true;
            } else {
                $this->message = $exception->getMessageString('AT001E', [
                    'Email' => env('CSR_EMAIL_ADDRESS')
                ]);
            }
            
        } else {
            $validation_state = true; // always true because BadLoginGuard has been disabled.
        }
        } catch (\Exception $e) {
            $validation_state = false;
        }
        

        return $validation_state;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {

        return $this->message;
    }
}
