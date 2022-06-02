<?php

namespace App\Rules\BasedataCheck;

use App\Core\Exception\Models\ExceptionModel;
use App\Models\Basedata\InspectionType as BasedataInspectionType;
use Illuminate\Contracts\Validation\Rule;


/**
 * Inspection Type Rule
 * @package App\Rules\BasedataCheck
 */
class InspectionType implements Rule
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
        // Find Inspection Type
        $find = BasedataInspectionType::query()->find($value);

        // Set bool
        $status = ($find == null ? false : true);

        // Exception message
        $exception = new ExceptionModel();

        $this->message = (
            $status ?
            '' :
            $exception->getMessageString('AP001C', ['FieldName' => 'Inspection Type'])
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
