<?php

namespace App\Http\Requests\Applicant\Application;

use App\Rules\BasedataCheck\BusinessType;
use App\Rules\BasedataCheck\CertificateType;
use Illuminate\Foundation\Http\FormRequest;

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
            'other' => [],
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
            'status' => ['nullable'],
        ];
    }
}
