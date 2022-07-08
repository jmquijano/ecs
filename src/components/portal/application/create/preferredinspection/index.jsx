import { FormControl, FormErrorMessage, FormLabel, GridItem, Input, Select } from "@chakra-ui/react";
import { Field } from "formik";
import { Fragment, useEffect } from "react";
import SectionTitle from "../sectiontitle";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import { businessDays } from "../../../../../utils/static-data/business-days";
import BusinessDaySelector from "../businessdayselector";
import moment from "moment";
import { time2DateTime } from "../../../../misc/formatTime";

export default function PreferredInspection(props) {
    const { businesstype, inspectiontype, preferredtime } = props;

    useEffect(() => {
        // console.log(props);
    }, [props]);

    return (
        <Fragment>
            <SectionTitle title={'Preferred Inspection'} />
            {/* Inspection Type Selector */}
            <GridItem colSpan={[12, 12, 4, 4]}>
                <Field 
                    name='preferred_inspectiontype'
                >
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form.errors?.preferred_inspectiontype && form.touched?.preferred_inspectiontype} 
                            isRequired
                        >
                            <FormLabel 
                                htmlFor={'preferred_inspectiontype'}
                                fontSize={12}
                            >
                                Preferred Mode
                            </FormLabel>
                            <Select
                                {...field}
                                id={'preferred_inspectiontype'}
                                fontSize={13}
                            >
                                <option value=""></option>
                                {
                                    inspectiontype?.data?.map((d, i) => (
                                        <option value={d?.id}>{d?.fullname}</option>
                                    ))
                                }
                            </Select>
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form.errors?.preferred_inspectiontype instanceof Map ? form.errors?.preferred_inspectiontype.map((d, i) => {
                                        return d;
                                    }) : form.errors?.preferred_inspectiontype
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>
            
            {/* Inspection Schedule (Day) */}
            <GridItem colSpan={[12, 12, 4, 4]}>
                <Field 
                    name='preferred_inspectionschedule.day'
                >
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form?.errors?.preferred_inspectionschedule?.day && form?.touched?.preferred_inspectionschedule?.day} 
                            
                        >
                            <FormLabel 
                                htmlFor={'preferred_inspectionschedule.day'}
                                fontSize={12}
                            >
                                Preferred Day
                            </FormLabel>
                            <BusinessDaySelector 
                                select={{
                                    ...field,
                                    fontSize: 12
                                }}
                                data={businessDays}
                                
                            />
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form?.error?.preferred_inspectionschedule?.day instanceof Map ? form?.errors['preferred_inspectionschedule.day']?.map((d, i) => {
                                        return d;
                                    }) : form?.errors?.preferred_inspectionschedule?.day
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>

            {/* Time Selector */}
            <GridItem colSpan={[12, 12, 4, 4]} height={'100%'}>
                <Field 
                    name='preferred_inspectionschedule.time'
                >
                    {({ field, form }) => (
                        <FormControl 
                            isInvalid={form.errors?.preferred_inspectionschedule?.time && form.touched?.preferred_inspectionschedule?.time} 
                            
                        >
                            <FormLabel 
                                htmlFor={'preferred_inspectionschedule.time'}
                                fontSize={12}
                            >
                                Preferred Time
                            </FormLabel>
                            <DatePicker
                                selected={time2DateTime(form?.values?.preferred_inspectionschedule?.time)}
                                onChange={preferredtime?.onChange}
                                showTimeSelect
                                showTimeSelectOnly
                                customInput={
                                    <Input 
                                        {...field} 
                                        id='preferred_inspectionschedule.time' 
                                        placeholder='' 
                                        fontSize={13}
                                        disabled={
                                            businesstype?.selected?.id >= 1 ? false : true
                                        }
                                        variant={businesstype?.selected?.id >= 0 ? 'outline' : 'filled' }
                                    />
                                }
                                disabled={
                                    businesstype?.selected?.id >= 1 ? false : true
                                }
                                filterDate={(date) => {
                                    return moment() > date;
                                }}
                                
                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                maxTime={setHours(setMinutes(new Date(), 0), 16)}
                                
                                dropdownMode="scroll"
                                dateFormat={'hh:mm aa'}
                                
                            />
                            <FormErrorMessage 
                                textAlign={'left'}
                                fontSize={12}
                            >
                                {
                                    form?.errors['preferred_inspectionschedule.time'] instanceof Map ? form?.errors['preferred_inspectionschedule.time']?.map((d, i) => {
                                        return d;
                                    }) : form?.errors?.preferred_inspectionschedule?.time
                                }
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </GridItem>
                
        </Fragment>
    )
}