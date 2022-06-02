<?php

namespace App\Http\Requests\Applicant\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Core\Exception\Models\ExceptionModel;
use App\Trait\ContactChannelFormatTrait;
use Illuminate\Http\Request;

/**
 * Change Password Confirm Request
 * @package App\Http\Requests\Applicant\User
 */
class ChangePasswordRequest extends FormRequest {
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
            'currentpassword' => ['required'],
            'newpassword' => ['required']
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        
        return [
            // Password
            'currentpassword.required' => $exception->getMessageString('UA001A'),
            'newpassword.required' => $exception->getMessageString("UA001C")
            
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
