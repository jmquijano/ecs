<?php

namespace App\Http\Requests\Applicant\Application;

use App\Core\Exception\Models\ExceptionModel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddEquipment extends FormRequest
{
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
            'equipment' => ['required', 'exists:basedata_equipments,id'],
            'context.acquisition_date' => ['nullable', 'date'],
            'context.expiration_date' => ['nullable', 'date'],
            'context.manufacturing_date' => ['nullable', 'date'],
            'context.serial_number' => ['nullable'],
            'context.manufacturer' => ['nullable']
        ];
    }

    /**
     * Messages for validation
     */
    public function messages() {
        $exception = new ExceptionModel();

        return [
            'equipment.required' => $exception->getMessageString('EQ001B'),
            'equipment.exists' => $exception->getMessageString('EQ001A'),
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
