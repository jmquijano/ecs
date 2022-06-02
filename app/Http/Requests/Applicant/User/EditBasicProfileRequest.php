<?php

namespace App\Http\Requests\Applicant\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Core\Exception\Models\ExceptionModel;
use App\Trait\ContactChannelFormatTrait;
use Illuminate\Http\Request;

/**
 * Edit Basic Profile Request
 * @package App\Http\Requests\Applicant\User
 */
class EditBasicProfileRequest extends FormRequest {
    use ContactChannelFormatTrait;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => ['nullable'],
            'middlename' => ['nullable'],
            'lastname' => ['nullable'],
            'salutation' => ['nullable']
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        
        return [
            // Password
            'password.required' => $exception->getMessageString('UCI-01A-E1'),
            'password.min' => $exception->getMessageString('UCI-01A-E2'),
            'password.required_with' => $exception->getMessageString('UCI-01A-E3'),
            'confirmpassword.same' => $exception->getMessageString('UCI-01A-E4'),
            'mobilenumber.unqiue' => $exception->getMessageString("UCI-02A-E1"),
            'emailaddress.unique' => $exception->getMessageString("UCI-02B-E1")
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
