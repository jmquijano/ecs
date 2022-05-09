<?php

namespace App\Rules\PSGCCheck;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Boundaries\PSGC;
use App\Core\Exception\Models\ExceptionModel;

class City implements Rule
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
        // Find PSGC ID
        $find = PSGC::query()->find($value);

        // Set bool
        $status = false;

        // Exception
        $exception = new ExceptionModel();

        if ($find !== null) {
            if (in_array($find->type, ['CITY', 'MUNICIPALITY'])) {
                $status = true;
            } else {
                $this->message = $exception->getMessageString('AP001D', [
                    'FieldValue' => "'" . $find->name . "'",
                    'FieldName' => 'City/Municipality'
                ]);
            }
        } else {
            $this->message = $exception->getMessageString('AP001C', [
                'FieldName' => 'City/Municipality'
            ]);
        }

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
