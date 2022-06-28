<?php

namespace App\Http\Requests\Applicant\Application;

use App\Rules\BasedataCheck\BusinessType;
use App\Rules\BasedataCheck\CertificateType;
use App\Rules\BasedataCheck\FiledApplicationStatus\ForApplicant;
use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateApplicationRequest extends FormRequest
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
            'business_id' => ['nullable'],
            'taxpayer_name' => ['nullable'],
            'trade_name' => ['nullable'],
            'barangay' => ['nullable'],
            'city' => ['nullable'],
            'province' => ['nullable'],
            'geomap' => ['nullable'],
            'geomap.longitude' => ['nullable'],
            'geomap.latitude' => ['nullable'],
            'address.room' => ['nullable'],
            'address.building' => ['nullable'],
            'address.street' => ['nullable'],
            'address.landmark' => ['nullable'],
            'other' => ['nullable'],
            'businesstype' => ['nullable', new BusinessType()],
            'certificatetype' => ['nullable', new CertificateType()],
            'other.tin' => ['nullable'],
            'other.branch_code' => ['nullable'],
            'other.rdo_code' => ['nullable'],
            'other.sec_registration_number' => ['nullable'],
            'other.date_of_birth' => ['nullable'],
            'other.date_of_incorporation' => ['nullable'],
            'other.cda_registration_number' => ['nullable'],
            'other.cda_registration_date' => ['nullable'],
            'other.dti_registration_number' => ['nullable'],
            'other.dti_registration_date' => ['nullable'],
            'businessline' => ['nullable', 'array'],
            'businessline.*' => ['nullable', 'exists:basedata_psic,id'],
            'status' => ['nullable', new ForApplicant()],
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
