import { FormControl, FormErrorMessage, FormLabel, GridItem, Input, Select } from "@chakra-ui/react";
import { Field } from "formik";
import { Fragment } from "react";
import SectionTitle from "../sectiontitle";
import moment from "moment";
import DatePicker from 'react-datepicker';

/**
 * 
 * @param {*} props 
 * @returns 
 */
export default function PrimaryInformation(props) {
    return (
        <Fragment>
            <SectionTitle title={'Primary Information'} />

            {/* Certification Type */}
            <GridItem colSpan={[12, 12, 12, 2]} display={'none'}>
                <Field 
                    name='certificatetype'
                >
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form.errors?.certificationtype && form.touched?.certificationtype} 
                            isRequired
                        >
                            <FormLabel 
                                htmlFor={'certificationtype'}
                                fontSize={12}
                            >
                                Certificate
                            </FormLabel>
                            <Select 
                                {...field} 
                                id='certificatetype' 
                                placeholder='' 
                                disabled
                            >
                                <option value=""></option>
                                {props?.certificate?.data.map((d, k) => (
                                    <option 
                                        selected={d?.fullname == "FSIC" ? true : false} 
                                        value={d?.id}
                                    >
                                        {d?.fullname}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form.errors?.certificationtype instanceof Map ? form.errors?.certificationtype.map((d, i) => {
                                        return d;
                                    }) : form?.errors?.certificationtype
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>

            {/* Business Ownership Type */}
            <GridItem colSpan={[12, 4, 4, 3]}>
                <Field 
                    name='businesstype'
                >
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form.errors?.businesstype && form.touched?.businesstype} 
                            isRequired
                            
                        >
                            <FormLabel 
                                htmlFor={'businesstype'}
                                fontSize={12}
                            >
                                Ownership
                            </FormLabel>
                            <Select 
                                {...field} 
                                id='businesstype' 
                                placeholder='' 
                                onChangeCapture={props?.businesstype?.onChangeCapture}
                                fontSize={13}
                            >
                                <option value="">Select</option>
                                {props?.businesstype?.data?.map((d, k) => (
                                    <option 
                                        value={d?.id}
                                    >
                                        {d?.fullname}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form.errors?.businesstype instanceof Map ? form.errors?.businesstype.map((d, i) => {
                                        return d;
                                    }) : form?.errors?.businesstype
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>
            {/* Business ID */}
            <GridItem colSpan={[12, 8, 8, 3]}>
                <Field name='business_id'>
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form.errors?.business_id && form.touched?.business_id} 
                            isRequired
                        >
                            <FormLabel 
                                htmlFor={'business_id'}
                                fontSize={12}
                            >
                                Business ID
                            </FormLabel>
                            <Input 
                                {...field} 
                                id='business_id' 
                                placeholder='' 
                                fontSize={13}
                                disabled={
                                    props?.businesstype?.selected?.id >= 1 ? false : true
                                }
                                variant={props?.businesstype?.selected?.id >= 0 ? 'outline' : 'filled' }
                            />
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form.errors?.business_id instanceof Map ? form.errors?.business_id.map((d, i) => {
                                        return d;
                                    }) : form?.errors?.business_id
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>
            {/* Taxpayer Name */}
            <GridItem colSpan={[12, 8, 8, 4]}>
                <Field name='taxpayer_name'>
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form.errors?.taxpayer_name && form.touched?.taxpayer_name} 
                            isRequired
                        >
                            <FormLabel 
                                htmlFor={'taxpayer_name'}
                                fontSize={12}
                            >
                                {props?.businesstype?.selected?.shortname == "CORP" || props?.businesstype?.selected?.shortname == "PRTN" || props?.businesstype?.selected?.shortname == "COOP"
                                    ? 
                                    "Name of " + props?.businesstype?.selected?.fullname
                                    :
                                    "Name of Taxpayer"
                                }
                            </FormLabel>
                            <Input 
                                {...field} 
                                id='taxpayer_name' 
                                placeholder='' 
                                fontSize={13}
                                disabled={
                                    props?.businesstype?.selected?.id >= 1 ? false : true
                                }
                                variant={props?.businesstype?.selected?.id >= 0 ? 'outline' : 'filled' }
                            />
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form.errors?.taxpayer_name instanceof Map ? form.errors?.taxpayer_name.map((d, i) => {
                                        return d;
                                    }) : form?.errors?.taxpayer_name
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>
            {/* Date of Birth/Incorporation */}
            <GridItem colSpan={[12, 4, 4, 2]}>
                <Field name='other.date_of_birth'>
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form.errors['other.date_of_birth'] && form.touched?.other.date_of_birth} 
                        >
                            <FormLabel 
                                htmlFor={'other.date_of_birth'}
                                fontSize={12}
                            >
                                {props?.businesstype?.selected?.shortname == "CORP"
                                    ? 
                                    "Date of Incorporation"
                                    :
                                    props?.businesstype?.selected?.shortname == "COOP" ?
                                    "Date of Registration"
                                    :
                                    props?.businesstype?.selected?.shortname == "PRTN" ?
                                    "Date of Registration"
                                    :
                                    "Date of Birth"
                                }
                            </FormLabel>
                            <DatePicker
                                selected={form?.values?.other?.date_of_birth}
                                onChange={props?.birthdate?.onChange}
                                customInput={
                                    <Input 
                                        {...field} 
                                        id='date_of_birth' 
                                        placeholder='' 
                                        fontSize={13}
                                        disabled={
                                            props?.businesstype?.selected?.id >= 1 ? false : true
                                        }
                                        variant={props?.businesstype?.selected?.id >= 0 ? 'outline' : 'filled' }
                                    />
                                }
                                disabled={
                                    props?.businesstype?.selected?.id >= 1 ? false : true
                                }
                                filterDate={(date) => {
                                    return moment() > date;
                                }}
                                
                                showYearDropdown
                                dropdownMode="scroll"
                                withPortal
                            />
                            
                            
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form.errors['other.date_of_birth'] instanceof Map ? form.errors['other.date_of_birth'].map((d, i) => {
                                        return d;
                                    }) : form?.errors['other.date_of_birth']
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>
        </Fragment>
    )
}