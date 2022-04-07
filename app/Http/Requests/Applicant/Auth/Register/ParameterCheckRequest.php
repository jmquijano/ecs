<?php 
/**
 * app/Http/Requests/Applicant/Auth/Register/ParameterCheckRequest.php 
 * @author jmquijano
 */
namespace App\Http\Requests\Applicant\Auth\Register;

use App\Http\Requests\Applicant\Auth\Register\RegistrationRequest;
use App\Trait\ContactChannelFormatTrait;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ParameterCheckRequest extends FormRequest {
    use ContactChannelFormatTrait;

    public function expectsJson()
    {
        return true;
    }

    public function rules() {
        return [
            'username' => 'sometimes|required|unique:applicant_user,username',
            'password' => 'sometimes|required_with:confirmpassword|min:8',
            'confirmpassword' => 'sometimes|same:password',
            'emailaddress' => 'sometimes|required|email|unique:applicant_user,emailaddress',
            'mobilenumber' => 'sometimes|required|numeric|unique:applicant_user,mobilenumber',
            'salutation' => 'sometimes|required',
            'firstname' => 'sometimes|required',
            'lastname' => 'sometimes|required'
        ];
    }

    public function messages() {
        // Use the validation message from RegistrationRequest
        return (new RegistrationRequest())->messages();
    }

    protected function prepareForValidation()
    {
        $array = array();
        
        if ($this->input('username')) {
            $array['username'] = $this->input('username');
        }

        if ($this->input('password')) {
            $array['password'] = $this->input('password');
        }

        if ($this->input('emailaddress')) {
            $array['emailaddress'] = $this->input('emailaddress');
        }

        if ($this->input('mobilenumber')) {
            $array['mobilenumber'] = $this->PrependAreaCode(63)->FormatMobileNumber($this->input('mobilenumber'));
        }

        if ($this->input('salutation')) {
            $array['salutation'] = $this->input('salutation');
        }

        if ($this->input('firstname')) {
            $array['firstname'] = $this->input('firstname');
        }

        if ($this->input('middlename')) {
            $array['middlename'] = $this->input('middlename');
        }

        if ($this->input('lastname')) {
            $array['lastname'] = $this->input('lastname');
        }

        $this->merge($array);
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