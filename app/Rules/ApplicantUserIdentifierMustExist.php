<?php

namespace App\Rules;

use App\Core\Exception\Models\ExceptionModel;
use App\Models\Applicant\User as ApplicantUser;
use Illuminate\Contracts\Validation\Rule;

class ApplicantUserIdentifierMustExist implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        // Applicant User Model
        $user = new ApplicantUser();

        return $user->findUserIdentifier($value)->count() >= 1;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        // Get exception message
        $exception = new ExceptionModel();

        return $exception->getMessageString('AT001A');
    }
}
