<?php

namespace App\Rules\PSGCCheck;

use App\Core\Exception\Models\ExceptionModel;
use App\Models\Boundaries\PSGC;
use Illuminate\Contracts\Validation\Rule;

/**
 * Barangay PSGC Check Rule
 * @package App\Rules\PSGCCheck
 */
class Barangay implements Rule
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
            if (in_array($find->type, ['BARANGAY'])) {
                $status = true;
            } else {
                $this->message = $exception->getMessageString('AP001D', [
                    'FieldValue' => "'" . $find->name . "'",
                    'FieldName' => 'Barangay'
                ]);
            }
        } else {
            $this->message = $exception->getMessageString('AP001C', [
                'FieldName' => 'Barangay'
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
