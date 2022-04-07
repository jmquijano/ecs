<?php 
/**
 * app/Http/Requests/Applicant/Auth/Register/VaerificationSmsRequest.php 
 * @author jmquijano
 */

namespace App\Http\Requests\Applicant\Auth\Register;

use Illuminate\Foundation\Http\FormRequest;
use App\Core\Exception\Models\ExceptionModel;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class OtpVerificationRequest extends FormRequest {

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
            'code' => 'required'
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();
        return [
            // Code
            'code.required' => $exception->getMessageString('AT005A')
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'code' => $this->input('code')
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