<?php 
namespace App\Http\Requests\Applicant\Auth\Login;

use Illuminate\Foundation\Http\FormRequest;
use App\Core\Exception\Models\ExceptionModel;
use App\Rules\ApplicantUserBadLogin;
use App\Rules\ApplicantUserIdentifierMustExist;
use App\Trait\ContactChannelFormatTrait;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Login Request
 * @package namespace App\Http\Requests\Applicant\Auth\Login
 */
class LoginRequest extends FormRequest {
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
            'username' => [
                'required', 
                new ApplicantUserIdentifierMustExist(),
                new ApplicantUserBadLogin()
            ],
            'password' => 'required'
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        return [
            // Code
            'username.required' => $exception->getMessageString('AT001C'),
            'password.required' => $exception->getMessageString('AT001D')
        ];
    }

    protected function prepareForValidation()
    {  
        $merge = [
            'password' => $this->input('password')
        ];

        // Username
        $username = $this->input('username');

        // Check if Username is numeric
        if (is_numeric($this->input('username'))) {
            // Check if count greater than 10
            $username = $this->PrependAreaCode("63")->FormatMobileNumber($this->input('username'));
        }

        $merge['username'] = $username;

        $this->merge($merge);
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