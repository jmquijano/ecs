<?php

namespace App\Rules\BasedataCheck;

use App\Core\Exception\Models\ExceptionModel;
use App\Models\Basedata\BusinessType as BasedataBusinessType;
use Illuminate\Contracts\Validation\Rule;

/**
 * Business Type Rule
 * @package App\Rules\BasedataCheck
 */
class BusinessType implements Rule
{
    protected string $message;

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
        // Find Business Type
        $find = BasedataBusinessType::query()->find($value);

        // Set bool
        $status = ($find == null ? false : true);

        // Exception message
        $exception = new ExceptionModel();

        $this->message = (
            $status ?
            '' :
            $exception->getMessageString('AP001C', ['FieldName' => 'Business Type'])
        );

        return $status;
        
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
