<?php

namespace App\Http\Requests\Applicant\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Core\Exception\Models\ExceptionModel;
use Illuminate\Http\Request;

/**
 * Change Email Confirm Request
 * @package App\Http\Requests\Applicant\User
 */
class ChangeEmailConfirmRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'otp' => ['required'],
            'id' => ['required', 'exists:applicant_user_changeemailconfirmation,id']
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        
        return [
            'otp.required' => $exception->getMessageString('MFA-E1B', ['type' => 'Confirmation code']),
            'id.required' => $exception->getMessageString('UA002D'),
            'id.exist' => $exception->getMessageString('UA002D')
        ];
    }

    protected function getValidatorInstance()
    {
        $factory = $this->container->make('Illuminate\Validation\Factory');

        if (method_exists($this, 'validator'))
        {
            return $this->container->call([$this, 'validator'], compact('factory'));
        }

        return $factory->make(
            $this->json()->all(), $this->container->call([$this, 'rules']), $this->messages(), $this->attributes()
        );
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->error(400, 'Validation Error', $validator->errors()));
    }
}
