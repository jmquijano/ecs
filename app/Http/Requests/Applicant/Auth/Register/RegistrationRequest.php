<?php
/**
 * app/Http/Requests/Applicant/Auth/Register/RegistrationRequest.php 
 * @author jmquiijano
 */
namespace App\Http\Requests\Applicant\Auth\Register;

use Illuminate\Foundation\Http\FormRequest;
use App\Core\Exception\Models\ExceptionModel;
use App\Trait\ContactChannelFormatTrait;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegistrationRequest extends FormRequest
{
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
            'username' => 'required|unique:applicant_user,username',
            'password' => 'required_with:confirmpassword|min:8',
            'confirmpassword' => 'same:password',
            'emailaddress' => 'required|email|unique:applicant_user,emailaddress',
            'mobilenumber' => 'required|min:11|unique:applicant_user,mobilenumber|regex:/^[0-9]*$/',
            'salutation' => 'required',
            'firstname' => 'required',
            'lastname' => 'required'
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        return [
            // Username
            'username.required' => $exception->getMessageString('AT004A'),
            'username.unique' => $exception->getMessageString('AT004B'),

            // Password
            'password.required' => $exception->getMessageString('AT004C'),
            'password.min' => $exception->getMessageString('AT004D'),
            'confirmpassword.same' => $exception->getMessageString('AT004K'),

            // Email Address
            'emailaddress.required' => $exception->getMessageString('AT004E'),
            'emailaddress.email' => $exception->getMessageString('AT004F'),
            'emailaddress.unique' => $exception->getMessageString('AT004G'),

            // Mobile Number
            'mobilenumber.regex' => $exception->getMessageString('AT004I'),
            'mobilenumber.numeric' => $exception->getMessageString('AT004I'),
            'mobilenumber.required' => $exception->getMessageString('AT004H'),
            'mobilenumber.unique' => $exception->getMessageString('AT004J'),

            // Salutation, first name and last name
            'salutation.required' => $exception->getMessageString('AT004L'),
            'firstname.required' => $exception->getMessageString('AT004M'),
            'lastname.required' => $exception->getMessageString('AT004N')
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'username' => $this->input('username'),
            'password' => $this->input('password'),
            'emailaddress' => $this->input('emailaddress'),
            'mobilenumber' => $this->PrependAreaCode(63)->FormatMobileNumber($this->input('mobilenumber')),
            'salutation' => $this->input('salutation'),
            'firstname' => $this->input('firstname'),
            'middlename' => $this->input('middlename'),
            'lastname' => $this->input('lastname')
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
