<?php

namespace App\Http\Requests\Applicant\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Core\Exception\Models\ExceptionModel;
use Illuminate\Http\Request;

/**
 * Change Email Request
 * @package App\Http\Requests\Applicant\User
 */
class ChangeEmailRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'emailaddress' => ['required', 'unique:applicant_user,emailaddress', 'email:rfc,dns']
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        
        return [
            // Password
            'emailaddress.required' => $exception->getMessageString('UA002A'),
            'emailaddress.unique' => $exception->getMessageString('UA002B'),
            'emailaddress.email' => $exception->getMessageString('UA002C')
            
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
