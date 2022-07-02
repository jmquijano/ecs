import { Fragment, useEffect } from "react";
import { Field } from "formik";
import { 
    AspectRatio, 
    FormControl, 
    FormErrorMessage, 
    FormLabel, 
    Grid, 
    GridItem, 
    Input, 
    Text 
} from "@chakra-ui/react";
import Dropdown from "./dropdown";
import { Maps, Pin } from "../../../../../maps";

export default function BusinessLocation(props) {
    useEffect(() => {
        // console.log(props);
    }, [props]);
    return (
        <Fragment>
            <Grid
                templateColumns={'repeat(12, 1fr)'} 
                width={'100%'} 
                gap={4}
                overflowY={'hidden'}
            >
                {/* PSGC Province */}
                {props?.businesstype?.selected?.id >= 1 ?
                <GridItem colSpan={[12, 12, 4, 4]}>
                    <Field 
                        name='province'
                    >
                        {({ field, form }) => (
                            <Dropdown
                                formControl={{
                                    isInvalid: form?.errors?.province && form?.touched?.province,
                                    isRequired: true,
                                    label: {
                                        text: 'Province',
                                        htmlFor: 'province'
                                    },
                                    errorMessage: form?.errors?.province
                                }}
                                autoComplete={{
                                    onChange: props?.province?.onChange,
                                    data: props?.province?.data,
                                    selected: props?.province?.selected
                                }}
                                loading={props?.province?.loading}
                            />  
                        )}
                    </Field>
                </GridItem>
                : ''
                }

                {/* PSGC City */}
                {props?.businesstype?.selected?.id >= 1 ?
                <GridItem colSpan={[12, 12, 4, 4]}>
                    <Field 
                        name='city'
                    >
                        {({ field, form }) => (
                            <Dropdown
                                formControl={{
                                    isInvalid: form?.errors?.city && form?.touched?.city,
                                    isRequired: true,
                                    label: {
                                        text: 'City / Municipality',
                                        htmlFor: 'city'
                                    },
                                    errorMessage: form?.errors?.city
                                }}
                                autoComplete={{
                                    onChange: props?.city?.onChange,
                                    data: props?.city?.data,
                                    selected: props?.city?.selected
                                }}
                                loading={props?.city?.loading}
                            />  
                        )}
                    </Field>
                </GridItem>
                : ''
                }

                {/* PSGC Barangay */}
                {props?.businesstype?.selected?.id >= 1 ?
                <GridItem colSpan={[12, 12, 4, 4]}>
                    <Field 
                        name='barangay'
                    >
                        {({ field, form }) => (
                            <Dropdown
                                formControl={{
                                    isInvalid: form?.errors?.barangay && form?.touched?.barangay,
                                    isRequired: true,
                                    label: {
                                        text: 'Barangay',
                                        htmlFor: 'barangay'
                                    },
                                    errorMessage: form?.errors?.barangay
                                }}
                                autoComplete={{
                                    onChange: props?.barangay?.onChange,
                                    data: props?.barangay?.data,
                                    selected: props?.barangay?.selected
                                }}
                                loading={props?.barangay?.loading}
                            />  
                        )}
                    </Field>
                </GridItem>
                : ''
                }

                {/* Room or Door */}
                {props?.businesstype?.selected?.id >= 1 ?
                <GridItem colSpan={[12, 12, 4, 4]}>
                    <Field 
                        name='address.room'
                    >
                        {({ values, field, form }) => (
                            <FormControl 
                                isInvalid={form.errors['address.room'] && form.touched?.address?.room}
                            >
                                <FormLabel 
                                    htmlFor={'address.room'}
                                    fontSize={12}
                                >
                                    Room / Door
                                    
                                </FormLabel>
                                <Input 
                                    {...field} 
                                    autoComplete={'off'}
                                    id='address.room' 
                                    placeholder='' 
                                    fontSize={13}
                                    disabled={
                                        form?.values?.barangay == null
                                    }
                                    variant={form?.values?.barangay == null ? 'filled' : 'outline'}
                                    
                                />
                                <FormErrorMessage 
                                    textAlign={'left'}
                                    fontSize={12}
                                >
                                    {
                                        form.errors['address.room'] instanceof Map ? form.errors['address.room'].map((d, i) => {
                                            return d;
                                        }) : form?.errors['address.room']
                                    }
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </GridItem>
                : ''
                }

                {/* Building */}
                {props?.businesstype?.selected?.id >= 1 ?
                <GridItem colSpan={[12, 12, 4, 4]}>
                    <Field 
                        name='address.building'
                    >
                        {({ values, field, form }) => (
                            <FormControl 
                                isInvalid={form.errors['address.building'] && form.touched?.address?.building}
                            >
                                <FormLabel 
                                    htmlFor={'address.building'}
                                    fontSize={12}
                                >
                                    Building
                                    
                                </FormLabel>
                                <Input 
                                    {...field} 
                                    autoComplete={'off'}
                                    id='address.room' 
                                    placeholder='' 
                                    fontSize={13}
                                    disabled={
                                        form?.values?.barangay == null
                                    }
                                    variant={form?.values?.barangay == null ? 'filled' : 'outline'}
                                    
                                />
                                <FormErrorMessage 
                                    textAlign={'left'}
                                    fontSize={12}
                                >
                                    {
                                        form.errors['address.room'] instanceof Map ? form.errors['address.room'].map((d, i) => {
                                            return d;
                                        }) : form?.errors['address.room']
                                    }
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </GridItem>
                : ''
                }

                {/* Street */}
                {props?.businesstype?.selected?.id >= 1 ?
                <GridItem colSpan={[12, 12, 4, 4]}>
                    <Field 
                        name='address.street'
                    >
                        {({ values, field, form }) => (
                            <FormControl 
                                isInvalid={(form.errors['address.street'] ?? form?.errors?.address?.street) && form.touched?.address?.street } 
                                isRequired
                                
                            >
                                <FormLabel 
                                    htmlFor={'address.street'}
                                    fontSize={12}
                                >
                                    Street
                                    
                                </FormLabel>
                                <Input 
                                    {...field} 
                                    autoComplete={'off'}
                                    id='address.street' 
                                    placeholder='' 
                                    fontSize={13}
                                    disabled={
                                        form?.values?.barangay == null
                                    }
                                    variant={form?.values?.barangay == null ? 'filled' : 'outline'}
                                    
                                />
                                <FormErrorMessage 
                                    textAlign={'left'}
                                    fontSize={12}
                                >
                                    {
                                        form.errors['address.street'] instanceof Map ? form.errors['address.street'].map((d, i) => {
                                            return d;
                                        }) : (form?.errors?.address?.street ?? form?.errors['address.street'])
                                    }
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </GridItem>
                : ''
                }
                

                {/* Map */}
                {props?.businesstype?.selected?.id >= 1 ? 
                <GridItem colSpan={[12, 12, 12, 12]}>
                    <AspectRatio
                        width={'100%'}
                        height={'400px'}
                    >
                        <Maps
                            center={props?.map?.position}
                            scrollWheelZoom={true}
                            zoom={15}
                        >
                            <Pin 
                                position={props?.map?.position}
                                PopupMessage={'Your are located here'}
                                onChange={props?.map?.pin?.onChange}
                            />
                        </Maps>

                        
                    </AspectRatio>

                    <Text 
                        mt={2}
                        fontSize={12} 
                        color={'red.500'}
                    >
                        REMINDER: <b>Pin the map according to your exact location.</b>
                    </Text>
                    
                </GridItem>
                : ''
                }
            </Grid>
            
        </Fragment>
    )
}