<?php

namespace App\Http\Requests\Applicant\Application;

use App\Core\Exception\Models\ExceptionModel;
use App\Rules\BasedataCheck\BusinessType;
use App\Rules\BasedataCheck\CertificateType;
use App\Rules\BasedataCheck\InspectionType;
use App\Rules\PSGCCheck\Barangay;
use App\Rules\PSGCCheck\City;
use App\Rules\PSGCCheck\Province;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Create Request
 * @package App\Http\Requests\Applicant\Application
 */
class CreateRequest extends FormRequest
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
            'business_id' => ['required'],
            'taxpayer_name' => ['required'],
            'trade_name' => ['required'],
            'barangay' => ['required', new Barangay()],
            'city' => ['required', new City()],
            'province' => ['required', new Province()],
            'geomap' => ['required'],
            'geomap.longitude' => ['required'],
            'geomap.latitude' => ['required'],
            'address.room' => ['nullable'],
            'address.building' => ['nullable'],
            'address.street' => ['required'],
            'address.landmark' => ['nullable'],
            'other' => [],
            'businesstype' => ['required', new BusinessType()],
            'certificatetype' => ['required', new CertificateType()],
            'other.tin' => ['nullable', 'required_with:branch_code'],
            'other.branch_code' => ['nullable', 'required_with:tin'],
            'other.rdo_code' => ['nullable', 'exists:basedata_revenuedistrictoffice,id'],
            'other.sec_registration_number' => ['nullable'],
            'other.date_of_birth' => ['nullable'],
            'other.date_of_incorporation' => ['nullable', 'same:other.date_of_birth'],
            'other.cda_registration_number' => ['nullable'],
            'other.cda_registration_date' => ['nullable'],
            'other.dti_registration_number' => ['nullable'],
            'other.dti_registration_date' => ['nullable'],
            'businessline' => ['required', 'array', 'exists:basedata_psic,id'],
            'businessline.*' => ['distinct'],
            'draftmode' => ['boolean'],
            'preferred_inspectiontype' => ['required', new InspectionType()],
            'preferred_iinspectionschedule.day' => ['nullable'],
            'preferred_iinspectionschedule.time' => ['nullable']
        ];
    }

    /**
     * Messages
     */
    public function messages() {
        $exception = new ExceptionModel();

        return [
            'business_id.required' => $exception->getMessageString('AP001A', ['FieldName' => 'Business ID']),
            'taxpayer_name.required' => $exception->getMessageString('AP001A', ['FieldName' => 'Taxpayer Name']),
            'trade_name.required' => $exception->getMessageString('AP001A', ['FieldName' => 'Trade Name']),
            'barangay.required' =>  $exception->getMessageString('AP001A', ['FieldName' => 'Barangay']),
            'city.required' => $exception->getMessageString('AP001A', ['FieldName' => 'City']),
            'province.required' => $exception->getMessageString('AP001A', ['FieldName' => 'Province']),
            'geomap.required' => $exception->getMessageString('AP001B'),
            'geomap.longitude.required' => $exception->getMessageString('AP001E', ['FieldName' => 'Longitude']),
            'geomap.latitude.required' => $exception->getMessageString('AP001E', ['FieldName' => 'Latitude']),
            'address.street.required' => $exception->getMessageString('AP001A', ['FieldName' => 'Street Address']),
            'businesstype.required' => $exception->getMessageString('AP001A', ['FieldName' => 'Business Type']),
            'certificatetype.required' => $exception->getMessageString('AP001A', ['FieldName' => 'Certificate Type']),
            'businessline.required' => $exception->getMessageString('AP001F', ['Count' => '1']),
            'businessline.exists' => $exception->getMessageString('AP001G'),
            'businessline.*.distinct' => $exception->getMessageString('AP001H'),
            'other.rdo_code.exists' => $exception->getMessageString('AP001I'),
            'draftmode.boolean' => $exception->getMessageString('AP001J'),
            'preferred_inspectiontype' => $exception->getMessageString('AP001A', ['FieldName' => 'Inspection Type']),

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
