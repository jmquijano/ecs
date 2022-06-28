<?php

namespace App\Rules\BasedataCheck\FiledApplicationStatus;

use App\Core\Exception\Models\ExceptionModel;
use App\Models\Basedata\FiledApplicationStatus as BasedataFiledApplicationStatus;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ForApplicant implements Rule
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
        $filedApplicationStatus = new BasedataFiledApplicationStatus();
        $find = null;
        // Find Filed Application Status
        if (is_int($value)) {
            try {
                $find = $filedApplicationStatus->query()->findOrFail($value);
            } catch (ModelNotFoundException $e) {

            }
            
        } else {
            try {
                $find = $filedApplicationStatus->findByShortname($value, true);
            } catch (ModelNotFoundException $e) {

            } 
        }

        // Set bool
        $status = (
            $find == null 
            ? 
            false 
            : 
            (
                $find->policy['can_be_set_by']['applicant'] 
                ? 
                true 
                : 
                false
            )
        );

        // Exception message
        $exception = new ExceptionModel();

        $this->message = (
            $status ?
            '' :
            $exception->getMessageString('AP001C', ['FieldName' => 'Filed Application Status'])
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
