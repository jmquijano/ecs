import { Grid, GridItem } from "@chakra-ui/react";
import { Field } from "formik";
import { Fragment, useEffect } from "react";
import InputField from "./inputfield";
import SelectField from "./selectfield";
import TinGroupField from "./tingroupfield";


export default function OtherInformation(props) {
    useEffect(() => {
        // console.log(props);
    }, [props]);
    return (
        <Fragment>
            <Grid
                templateColumns={'repeat(12, 1fr)'} 
                width={'100%'} 
                gap={4}
            >   
                {/* DTI Trade Name */}
                {props?.businesstype?.selected?.shortname == "INDV" ?
                <GridItem colSpan={[12, 12, 12, 6]}>
                    <Field name='trade_name'>
                        {({ field, form }) => (
                            <InputField 
                                formControl={{
                                    isInvalid: form.errors.trade_name && form.touched?.trade_name,
                                    isRequired: true,
                                    label: {
                                        htmlFor: 'trade_name',
                                        text: 'Trade Name'
                                    },
                                    input: {
                                        id: 'trade_name',
                                        field: field
                                    },
                                    errorMessage: (
                                        form.errors?.trade_name instanceof Map ? form.errors?.trade_name.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.trade_name 
                                    )
                                    
                                }}
                            />
                        )}
                    </Field>
                    
                </GridItem>
                : ""}

                {/* DTI Reg. No. */}
                {props?.businesstype?.selected?.shortname == "INDV" ?
                <GridItem colSpan={[12, 12, 12, 3]}>
                    <Field name='other.dti_registration_number'>
                        {({ field, form }) => (
                            <InputField 
                                formControl={{
                                    isInvalid: form?.errors['other.dti_registration_number'] && form.touched?.other.dti_registration_number,
                                    isRequired: false,
                                    label: {
                                        htmlFor: 'other.dti_registration_number',
                                        text: 'DTI Registry No.'
                                    },
                                    input: {
                                        id: 'other.dti_registration_number',
                                        field: field
                                    },
                                    errorMessage: (
                                        form?.errors['other.dti_registration_number'] instanceof Map ? form?.errors['other.dti_registration_number'].map((d, i) => {
                                            return d;
                                        }) : form?.errors['other.dti_registration_number']
                                    )
                                    
                                }}
                                
                            />
                        )}
                    </Field>
                </GridItem>
                : ""}

                {/* DTI Registration Date */}
                {props?.businesstype?.selected?.shortname == "INDV" ?
                <GridItem colSpan={[12, 12, 12, 3]}>
                    <Field name='other.dti_registration_date'>
                        {({ field, form }) => (
                            <InputField 
                                formControl={{
                                    isInvalid: form?.errors['other.dti_registration_date'] && form.touched?.other.dti_registration_date,
                                    isRequired: false,
                                    label: {
                                        htmlFor: 'other.dti_registration_date',
                                        text: 'DTI Registry Date.'
                                    },
                                    input: {
                                        id: 'other.dti_registration_date',
                                        field: field
                                    },
                                    errorMessage: (
                                        form?.errors['other.dti_registration_date'] instanceof Map ? form?.errors['other.dti_registration_date'].map((d, i) => {
                                            return d;
                                        }) : form?.errors['other.dti_registration_date']
                                    )
                                    
                                }}
                            />
                        )}
                    </Field>
                </GridItem>
                : ""}

                {/* SEC Company Name */}
                {props?.businesstype?.selected?.shortname == "CORP" ||  props?.businesstype?.selected?.shortname == "PRTN" || props?.businesstype?.selected?.shortname == "COOP" ?
                <GridItem colSpan={[12, 12, 12, 8]}>
                    <Field name='taxpayer_name'>
                        {({ field, form }) => (
                            <InputField 
                                formControl={{
                                    isInvalid: form?.errors?.taxpayer_name && form.touched?.taxpayer_name,
                                    isRequired: false,
                                    label: {
                                        htmlFor: 'taxpayer_name',
                                        text: 'SEC Registered ' +  props?.businesstype?.selected?.fullname + ' Name'
                                    },
                                    input: {
                                        id: 'taxpayer_name',
                                        field: field
                                    },
                                    errorMessage: (
                                        form?.errors?.taxpayer_name instanceof Map ? form?.errors?.taxpayer_name.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.taxpayer_name
                                    )
                                    
                                }}
                            />
                        )}
                    </Field>
                </GridItem>
                : ""}

                {/* SEC Registration No. */}
                {props?.businesstype?.selected?.shortname == "CORP" ||  props?.businesstype?.selected?.shortname == "PRTN" || props?.businesstype?.selected?.shortname == "COOP" ?
                <GridItem colSpan={[12, 12, 12, 4]}>
                    <Field name='other.sec_registration_number'>
                        {({ field, form }) => (
                            <InputField 
                                formControl={{
                                    isInvalid: form?.errors['other.sec_registration_number'] && form.touched?.other.sec_registration_number,
                                    isRequired: false,
                                    label: {
                                        htmlFor: 'other.sec_registration_number',
                                        text: 'SEC Registration No.'
                                    },
                                    input: {
                                        id: 'other.sec_registration_number',
                                        field: field
                                    },
                                    errorMessage: (
                                        form?.errors['other.sec_registration_number'] instanceof Map ? form?.errors['other.sec_registration_number'].map((d, i) => {
                                            return d;
                                        }) : form?.errors['other.sec_registration_number']
                                    )
                                    
                                }}
                            />
                        )}
                    </Field>
                </GridItem>
                : ""}

                {/* CDA Registered Name */}
                {props?.businesstype?.selected?.shortname == "COOP" ?
                <GridItem colSpan={[12, 12, 12, 8]}>
                    <Field name='taxpayer_name'>
                        {({ field, form }) => (
                            <InputField 
                                formControl={{
                                    isInvalid: form?.errors?.taxpayer_name && form.touched?.taxpayer_name,
                                    isRequired: false,
                                    label: {
                                        htmlFor: 'taxpayer_name',
                                        text: 'CDA Registered Name'
                                    },
                                    input: {
                                        id: 'taxpayer_name',
                                        field: field
                                    },
                                    errorMessage: (
                                        form?.errors?.taxpayer_name instanceof Map ? form?.errors?.taxpayer_name.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.taxpayer_name
                                    )
                                    
                                }}
                            />
                        )}
                    </Field>
                </GridItem>
                : ""}

                {/* CDA Registration Number */}
                {props?.businesstype?.selected?.shortname == "COOP" ?
                <GridItem colSpan={[12, 12, 12, 4]}>
                    <Field name='other.cda_registration_number'>
                        {({ field, form }) => (
                            <InputField 
                                formControl={{
                                    isInvalid: form?.errors['other.cda_registration_number'] && form.touched?.other.cda_registration_number,
                                    isRequired: false,
                                    label: {
                                        htmlFor: 'other.cda_registration_number',
                                        text: 'CDA Registration Number'
                                    },
                                    input: {
                                        id: 'other.cda_registration_number',
                                        field: field
                                    },
                                    errorMessage: (
                                        form?.errors['other.cda_registration_number'] instanceof Map ? form?.errors['other.cda_registration_number'].map((d, i) => {
                                            return d;
                                        }) : form?.errors['other.cda_registration_number']
                                    )
                                    
                                    
                                }}
                            />
                        )}
                    </Field>
                </GridItem>
                : ""}

                {/* BIR TIN */}
                {props?.businesstype?.selected?.id >= 1 ? 
                    <GridItem colSpan={[12, 7, 6, 4]}>
                        <Field 
                            name='other.tin'
                        >
                            {({ field, form }) => (
                                <TinGroupField 
                                    formControl={{
                                        isInvalid: form.errors?.other?.tin && form.touched?.other?.tin,
                                        isRequired: false,
                                        label: {
                                            htmlFor: 'other.tin',
                                            text: 'BIR TIN'
                                        }
                                    }}
                                    tin1={props?.other?.tin1}
                                    tin2={props?.other?.tin2}
                                    tin3={props?.other?.tin3}
                                    tin4={props?.other?.tin4}
                                />
                            )}
                        </Field>
                    </GridItem>
                :
                ''
                }

                {/* BIR RDO */}
                {props?.businesstype?.selected?.id >= 1 ?
                <GridItem colSpan={[12, 5, 6, 8]}>
                    <Field 
                        name='other.rdo_code'
                    >
                        {({ field, form }) => (
                            <SelectField 
                                formControl={{
                                    isInvalid: form.errors?.other?.rdo_code && form.touched?.other?.rdo_code,
                                    isRequired: false,
                                    label: {
                                        text: 'BIR RDO',
                                        htmlFor: 'other.rdo_code'
                                    },
                                    select: {
                                        id: 'other.rdo_code',
                                        field: field
                                    }

                                }}
                                data={props?.other?.rdo_code?.data}
                                selected={props?.other?.rdo_code?.selected}
                                
                            />
                        )}
                    </Field>
                </GridItem>
                : ''
                }
            </Grid>
            
        </Fragment>
    )
}