<?php

namespace App\Http\Requests\Applicant\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Core\Exception\Models\ExceptionModel;
use App\Trait\ContactChannelFormatTrait;

/**
 * Change Mobile Number Request
 * @package App\Http\Requests\Applicant\User
 */
class ChangeMobileNumberRequest extends FormRequest
{
    use ContactChannelFormatTrait;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'mobilenumber' => ['required', 'unique:applicant_user,mobilenumber', 'numeric']
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        
        return [
            // Mobile Number
            'mobilenumber.required' => $exception->getMessageString('UA003A'),
            'mobilenumber.unique' => $exception->getMessageString('UA003B'),
            'mobilenumber.numeric' => $exception->getMessageString('UA003C')
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'mobilenumber' => $this->PrependAreaCode(63)->FormatMobileNumber($this->input('mobilenumber'))
        ]);
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
