import { Grid, GridItem, Container, Heading, Text, Button, Stack, Box, FormControl, Input, FormLabel, FormErrorMessage, Select, Divider, Modal, ModalOverlay, ModalContent, Center, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { BiArrowToLeft, BiCaretRight, BiChevronLeft, BiPlus } from "react-icons/bi"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async";
import { Step, Steps, useSteps } from "chakra-ui-steps"
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik, Field } from "formik";
import { fetchBusinessType, fetchCertificateType } from "../../../utils/basedata";
import { fetchBarangay, fetchCity, fetchProvince } from "../../../utils/boundaries";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import { Loader } from "../../../components/loaders";
import { HandleGeolocPermission, Maps, Pin } from "../../../components/maps";

function BusinessInformation ({props}) {
    const [formValues, setFormValues] = useState({
        business_id: null,
        taxpayer_name: null,
        trade_name: null,
        businesstype: null,
        certificationtype: null,
        barangay: null,
        city: null,
        province: null,
        address: {
            room: null,
            building: null,
            street: null,
            landmark: null

        },
        geomap: {
            longitude: null,
            latitude: null
        },
        businessline: [],
        other: {
            tin: null,
            branch_code: null,
            rdo_code: null,
            sec_registration_number: null,
            date_of_birth: null,
            dti_registration_number: null,
            dti_registration_date: null,
            cda_registration_number: null,
            cda_registration_date: null
        }
    });


    const validationSchema = Yup.object().shape({
        business_id: Yup.string().required("Business ID is a mandatory field.").typeError(""),
        taxpayer_name: Yup.string().required("This is a mandatory field.").nullable().typeError(""),
        trade_name: Yup.string().nullable(true),
        businesstype: Yup.number().required("Business Type is a mandatory field.").nullable(false).typeError("Business Type is a mandatory field."),
        certificationtype: Yup.string().required("Certificate Type is a mandatory field."),
        barangay: Yup.number().required("Barangay is a mandatory field."),
        city: Yup.number().required("City is a mandatory field."),
        province: Yup.number().required("Barangay is a mandatory field."),
        businessline: Yup.array().required("Business Line is a mandatory field"),
        other: Yup.object().shape({
            tin: Yup.addMethod(Yup.string, 'integer', () => {
                if (this !== null) {
                    return this.matches(/^\d+$/, 'The field should contain numeric characters.');
                }
            }),
            branch_code: Yup.addMethod(Yup.string, 'integer', () => {
                if (this !== null) {
                    return this.matches(/^\d+$/, 'The field should contain numeric characters.');
                }
            }),
            rdo_code: Yup.number().nullable(true),
            sec_registration_number: Yup.string().nullable(true),
            date_of_birth: Yup.date().nullable(true)
        }).nullable(true)
    });

    const formikSubmitHandler = async (values, { setErrors, resetForm }) => {
    };
    const formikInit = useFormik({
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: formikSubmitHandler,
        dirty: true,
        enableReinitialize: true
    });

    const [loading, setLoading] = useState({
        general: false,
        field: {
            businessType: false,
            province: false,
            city: false,
            barangay: false
        }
    });
    
    const [certificateType, setCertificateType] = useState();
    const [businessType, setBusinessType] = useState([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState({});

    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [barangay, setBarangay] = useState([]);
    const [locateMe, setLocateMe] = useState();

    const [focusMap, setFocusMap] = useState({
        lng: null,
        lat: null
    });

    const [pinMap, setPinMap] = useState({
        lng: null,
        lat: null
    })
   
    useEffect(() => {
        HandleGeolocPermission();

        // Set Geolocate
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocateMe({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });

        fetchCertificateType()
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setCertificateType(res?.data);
                }
            });

        fetchBusinessType()
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setBusinessType(res?.data);
                }
            });

        fetchProvince(() => {
            setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    province: true
                }
            });
        })
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setProvince(res?.data);

                    if (res?.data[0]?.path[0]) {
                        const coordinates = {
                            lng: parseFloat(res?.data[0]?.path[0]?.lng),
                            lat: parseFloat(res?.data[0]?.path[0]?.lat),
                            zoom: 8
                        };
    
                        // console.log(coordinates);
                        setFocusMap(coordinates);
                    }
                }
            })
            .finally(e => 
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        province: false
                    }
                })    
            );
    }, []);

    useEffect(() => {
        console.log(pinMap);
    }, [pinMap]);

    const handleBusinessTypeChange = async (e) => {
        let _id = e?.target?.value;
        const _f = businessType.filter(x => x.id == _id);
        setSelectedBusinessType(_f[0]);
    }
    
    const handleProvinceChange = async (e, form) => {
        let _id = e?.target?.value ?? e;

        // Set Field Value
        formikInit?.setFieldValue('province', parseInt(_id));

        fetchCity(_id, () => {
            setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    city: true
                }
            })    
        })
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setCity(res?.data);

                if (res?.data[0]?.path[0]) {
                    const coordinates = {
                        lng: parseFloat(res?.data[0]?.path[0]?.lng),
                        lat: parseFloat(res?.data[0]?.path[0]?.lat),
                        zoom: 9
                    };

                    // console.log(coordinates);
                    setFocusMap(coordinates);
                }
            }
        })
        .finally(e => 
            setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    city: false
                }
            })        
        );
    }

    const handleCityChange = async (e) => {
        let _id = e?.target?.value ?? e;

        // Set Field Value
        formikInit?.setFieldValue('city', parseInt(_id));

        fetchBarangay(_id, () => {
            setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    barangay: true
                }
            })    
        })
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setBarangay(res?.data);

                if (res?.data[0]?.path[0]) {
                    const coordinates = {
                        lng: parseFloat(res?.data[0]?.path[0]?.lng),
                        lat: parseFloat(res?.data[0]?.path[0]?.lat),
                        zoom: 13
                    };

                    // console.log(coordinates);
                    setFocusMap(coordinates);
                }
            }
        })
        .finally(e => 
            setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    barangay: false
                }
            })        
        );
    }

    const handleBarangayChange = async (e) => {
        let _id = e?.target?.value ?? e;

        // Set Field Value
        formikInit?.setFieldValue('barangay', parseInt(_id));

        // Search Barangay
        const searchBarangay= barangay?.filter(x => x.id == e);

        if (searchBarangay[0].path[0]) {

            if ("geolocation" in navigator) {
                // console.log("Available");
            } else {
                // console.log("Not Available");
            }

            const coordinates = {
                lng: locateMe?.lng ?? parseFloat(searchBarangay[0].path[0]?.lng),
                lat: locateMe?.lat ?? parseFloat(searchBarangay[0].path[0]?.lat)
            };

            // console.log(coordinates);
            setFocusMap({
                ...coordinates,
                zoom: 15
            });
            setPinMap(coordinates);
        }
    }
    

    return (
        <Fragment>
            <Modal isOpen={loading?.general} isCentered bg={'transparent'}>
                <ModalOverlay 
                    bg='blackAlpha.500'
                />
                <ModalContent bg={'transparent'} shadow={'none'} w={'auto'} h={'auto'} px={4} py={4}>
                    <Center
                        alignItems={'center'}
                        alignContent={'center'}
                    >
                        <Loader.PulseLoader color={'white'} />
                    </Center>
                    
                </ModalContent>
            </Modal>
            <Box px={[0, 5, 5, 10]} pt={[0, 5, 5, 5]} pb={10} height={'100%'}>
                <FormikProvider value={formikInit}>
                    <Form>
                        <Grid 
                            templateColumns={'repeat(12, 1fr)'} 
                            width={'100%'} 
                            gap={4}
                        >
                            <GridItem 
                                colSpan={12} 
                                mt={4}
                            >
                                <Text
                                    fontSize={12}
                                >
                                    Fields with asterisk (<Text color={'red'} display={'inline'}>*</Text>) are mandatory fields and shouldn't be left empty.
                                </Text>
                            </GridItem>

                            {/** 
                             * Primary Business Information
                             */}
                            <GridItem 
                                colSpan={12} 
                                mt={4}
                            >
                                <Box
                                    display={'block'}
                                    borderTop={'2px solid'}
                                    borderColor={'brand.200'}
                                    height={'auto'}
                                    textAlign={'left'}
                                >
                                    <Text
                                        as={'span'}
                                        bg={'gray.200'} 
                                        color={'brand.200'}
                                        display={'inline-block'} 
                                        mt={0} 
                                        py={2}
                                        px={5}
                                        fontSize={13}
                                        fontWeight={600}
                                        borderBottomRadius={'8px'}
                                        textAlign={['center', 'center', 'left', 'left']}
                                        width={['100%', '100%', 'auto', 'auto']}
                                    >
                                        Primary Information
                                    </Text>
                                </Box>
                                
                            </GridItem>
                            {/* Certification Type */}
                            <GridItem colSpan={[12, 12, 12, 2]} display={'none'}>
                                <Field 
                                    name='certificationtype'
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
                                                id='certificationtype' 
                                                placeholder='' 
                                                disabled
                                            >
                                                <option value=""></option>
                                                {certificateType?.map((d, k) => (
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
                                                onChangeCapture={handleBusinessTypeChange}
                                                fontSize={13}
                                            >
                                                <option value="">Select</option>
                                                {businessType?.map((d, k) => (
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
                                                    selectedBusinessType?.id >= 1 ? false : true
                                                }
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
                                                {selectedBusinessType?.shortname == "CORP" || selectedBusinessType?.shortname == "PRTN" || selectedBusinessType?.shortname == "COOP"
                                                    ? 
                                                    "Name of " + selectedBusinessType?.fullname
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
                                                    selectedBusinessType?.id >= 1 ? false : true
                                                }
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
                                                {selectedBusinessType?.shortname == "CORP"
                                                    ? 
                                                    "Date of Incorporation"
                                                    :
                                                    selectedBusinessType?.shortname == "COOP" ?
                                                    "Date of Registration"
                                                    :
                                                    selectedBusinessType?.shortname == "PRTN" ?
                                                    "Date of Registration"
                                                    :
                                                    "Date of Birth"
                                                }
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='other.date_of_birth' 
                                                placeholder='' 
                                                fontSize={13}
                                                disabled={
                                                    selectedBusinessType?.id >= 1 ? false : true
                                                }
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
                            
                            {
                            /**
                             * Business Location
                             */
                            selectedBusinessType?.id >= 1 ?
                            <GridItem 
                                colSpan={12} 
                                mt={4}
                            >
                                <Box
                                    display={'block'}
                                    borderTop={'2px solid'}
                                    borderColor={'brand.200'}
                                    height={'auto'}
                                    textAlign={'left'}
                                >
                                    <Text
                                        as={'span'}
                                        bg={'gray.200'} 
                                        color={'brand.200'}
                                        display={'inline-block'} 
                                        mt={0} 
                                        py={2}
                                        px={5}
                                        fontSize={13}
                                        fontWeight={600}
                                        borderBottomRadius={'8px'}
                                        textAlign={['center', 'center', 'left', 'left']}
                                        width={['100%', '100%', 'auto', 'auto']}
                                    >
                                        Business Address
                                    </Text>
                                </Box>
                                
                            </GridItem>
                            : ''
                            }
                            {/* PSGC Province */}
                            {selectedBusinessType?.id >= 1 ?
                            <GridItem colSpan={[12, 12, 4, 4]}>
                                <Field 
                                    name='province'
                                >
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form.errors?.province && form.touched?.province} 
                                            isRequired
                                            
                                        >
                                            <FormLabel 
                                                htmlFor={'province'}
                                                fontSize={12}
                                            >
                                                Province
                                            </FormLabel>
                                            <AutoComplete 
                                                openOnFocus 
                                                onChange={handleProvinceChange}
                                            >
                                                <Stack direction={'row'}>
                                                    <InputGroup>
                                                        <AutoCompleteInput
                                                            autoComplete="no"
                                                            fontSize={12}
                                                            disabled={
                                                                province.length <= 0 ? true : false
                                                            }
                                                            cursor={
                                                                province.length <= 0 ? 'progress' : 'pointer'
                                                            }
                                                            variant={province.length <= 0 ? 'filled' : 'outline'}
                                                        />
                                                        {
                                                            loading?.field?.province ?
                                                            <InputRightElement children={<Loader.Default size={'md'} thickness={'3px'} />} />
                                                            :
                                                            ''
                                                        }
                                                    </InputGroup>
                                                </Stack>
                                                
                                                <AutoCompleteList
                                                    mt={1}
                                                >
                                                    {
                                                        province?.map((d, i) => {
                                                            return (<AutoCompleteItem
                                                                key={d?.id}
                                                                value={String(d?.id)}
                                                                label={d?.name}
                                                                fontSize={13}
                                                            >
                                                                {d?.name}
                                                            </AutoCompleteItem>
                                                            );
                                                        })
                                                    }
                                                </AutoCompleteList>
                                            </AutoComplete>
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form.errors?.province instanceof Map ? form.errors?.province.map((d, i) => {
                                                        return d;
                                                    }) : form?.errors?.province
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ''
                            }

                            {/* PSGC City */}
                            {selectedBusinessType?.id >= 1 ?
                            <GridItem colSpan={[12, 12, 4, 4]}>
                                <Field 
                                    name='city'
                                >
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form.errors?.city && form.touched?.city} 
                                            isRequired
                                            
                                        >
                                            <FormLabel 
                                                htmlFor={'city'}
                                                fontSize={12}
                                            >
                                                City / Municipality
                                            </FormLabel>
                                            <AutoComplete 
                                                openOnFocus 
                                                onChange={handleCityChange}
                                            >
                                                <Stack direction={'row'}>
                                                    <InputGroup>
                                                        <AutoCompleteInput
                                                            fontSize={12}
                                                            disabled={
                                                                city.length <= 0 ? true : false
                                                            }
                                                            cursor={
                                                                city.length <= 0 ? 'progress' : 'pointer'
                                                            }
                                                            variant={city.length <= 0 ? 'filled' : 'outline'}
                                                        />
                                                        {
                                                            loading?.field?.city ?
                                                            <InputRightElement children={<Loader.Default size={'md'} thickness={'3px'} />} />
                                                            :
                                                            ''
                                                        }
                                                    </InputGroup>
                                                </Stack>
                                                
                                                <AutoCompleteList
                                                    mt={1}
                                                >
                                                    {
                                                        city?.map((d, i) => {
                                                            return (<AutoCompleteItem
                                                                key={d?.id}
                                                                value={String(d?.id)}
                                                                label={d?.name}
                                                                fontSize={13}
                                                            >
                                                                {d?.name}
                                                            </AutoCompleteItem>
                                                            );
                                                        })
                                                    }
                                                </AutoCompleteList>
                                            </AutoComplete>
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form.errors?.city instanceof Map ? form.errors?.city.map((d, i) => {
                                                        return d;
                                                    }) : form?.errors?.city
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ''
                            }

                            {/* PSGC Barangay */}
                            {selectedBusinessType?.id >= 1 ?
                            <GridItem colSpan={[12, 12, 4, 4]}>
                                <Field 
                                    name='barangay'
                                >
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form.errors?.barangay && form.touched?.barangay} 
                                            isRequired
                                            
                                        >
                                            <FormLabel 
                                                htmlFor={'barangay'}
                                                fontSize={12}
                                            >
                                                Barangay
                                            </FormLabel>
                                            <AutoComplete 
                                                openOnFocus 
                                                onChange={handleBarangayChange}
                                            >
                                                <Stack direction={'row'}>
                                                    <InputGroup>
                                                        <AutoCompleteInput
                                                            fontSize={12}
                                                            disabled={
                                                                barangay.length <= 0 ? true : false
                                                            }
                                                            cursor={
                                                                barangay.length <= 0 ? 'progress' : 'pointer'
                                                            }
                                                            variant={barangay.length <= 0 ? 'filled' : 'outline'}
                                                        />
                                                        {
                                                            loading?.field?.barangay ?
                                                            <InputRightElement children={<Loader.Default size={'md'} thickness={'3px'} />} />
                                                            :
                                                            ''
                                                        }
                                                    </InputGroup>
                                                </Stack>

                                                <AutoCompleteList
                                                    mt={1}
                                                >
                                                    {
                                                        barangay?.map((d, i) => {
                                                            return (<AutoCompleteItem
                                                                key={d?.id}
                                                                value={String(d?.id)}
                                                                label={d?.name}
                                                                fontSize={13}
                                                            >
                                                                {d?.name}
                                                            </AutoCompleteItem>
                                                            );
                                                        })
                                                    }
                                                </AutoCompleteList>
                                            </AutoComplete>
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form.errors?.barangay instanceof Map ? form.errors?.barangay.map((d, i) => {
                                                        return d;
                                                    }) : form?.errors?.barangay
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ''
                            }

                            {/* Room or Door */}
                            {selectedBusinessType?.id >= 1 ?
                            <GridItem colSpan={[12, 12, 4, 4]}>
                                <Field 
                                    name='address.room'
                                >
                                    {({ values, field, form }) => (
                                        <FormControl 
                                            isInvalid={form.errors['address.room'] && form.touched?.address?.room} 
                                            isRequired
                                            
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
                            {selectedBusinessType?.id >= 1 ?
                            <GridItem colSpan={[12, 12, 4, 4]}>
                                <Field 
                                    name='address.building'
                                >
                                    {({ values, field, form }) => (
                                        <FormControl 
                                            isInvalid={form.errors['address.building'] && form.touched?.address?.building} 
                                            isRequired
                                            
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
                            {selectedBusinessType?.id >= 1 ?
                            <GridItem colSpan={[12, 12, 4, 4]}>
                                <Field 
                                    name='address.street'
                                >
                                    {({ values, field, form }) => (
                                        <FormControl 
                                            isInvalid={form.errors['address.street'] && form.touched?.address?.street} 
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
                                                    }) : form?.errors['address.street']
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ''
                            }
                            

                            {/* Map */}
                            {selectedBusinessType?.id >= 1 ? 
                            <GridItem colSpan={[12, 12, 12, 12]}>
                                <Box
                                    width={'100%'}
                                    height={'400px'}
                                >
                                    <Maps
                                        
                                        center={focusMap}
                                        zoom={focusMap?.zoom}
                                        scrollWheelZoom={true}
                                    >
                                        <Pin 
                                            position={{
                                                lng: focusMap?.lng,
                                                lat: focusMap?.lat
                                            }}
                                            PopupMessage={'Your are located here'}
                                            onChange={(e) => setPinMap(e)}
                                        />
                                    </Maps>

                                    
                                </Box>

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

                            {/* Business Lines */}
                            {
                                selectedBusinessType?.id >= 1 ?
                                <GridItem 
                                    colSpan={12} 
                                    mt={4}
                                >
                                    <Box
                                        display={'block'}
                                        borderTop={'2px solid'}
                                        borderColor={'brand.200'}
                                        height={'auto'}
                                        textAlign={'left'}
                                    >
                                        <Text
                                            as={'span'}
                                            bg={'gray.200'} 
                                            color={'brand.200'}
                                            display={'inline-block'} 
                                            mt={0} 
                                            py={2}
                                            px={5}
                                            fontSize={13}
                                            fontWeight={600}
                                            borderBottomRadius={'8px'}
                                        >
                                            Business Lines
                                        </Text>
                                    </Box>
                                    
                                </GridItem>
                                : ''
                            }
                            
                            {/* Other Information */}
                            {
                                selectedBusinessType?.id >= 1 ?
                                <GridItem 
                                    colSpan={12} 
                                    mt={4}
                                >
                                    <Box
                                        display={'block'}
                                        borderTop={'2px solid'}
                                        borderColor={'brand.200'}
                                        height={'auto'}
                                        textAlign={'left'}
                                    >
                                        <Text
                                            as={'span'}
                                           
                                            bg={'gray.200'} 
                                            color={'brand.200'}
                                            display={'inline-block'} 
                                            mt={0} 
                                            py={2}
                                            px={5}
                                            fontSize={13}
                                            fontWeight={600}
                                            borderBottomRadius={'8px'}
                                        >
                                            Other Information
                                        </Text>
                                    </Box>
                                    
                                </GridItem>
                                : ''
                            }
                            
                            {/* DTI Trade Name */}
                            {selectedBusinessType?.shortname == "INDV" ?
                            <GridItem colSpan={[12, 12, 12, 6]}>
                                <Field name='trade_name'>
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form.errors?.trade_name && form.touched?.trade_name} 
                                            isRequired={false}
                                        >
                                            <FormLabel 
                                                htmlFor={'trade_name'}
                                                fontSize={12}
                                            >
                                                DTI Trade Name
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='trade_name' 
                                                placeholder='' 
                                                fontSize={13}
                                            />
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form.errors?.trade_name instanceof Map ? form.errors?.trade_name.map((d, i) => {
                                                        return d;
                                                    }) : form?.errors?.trade_name
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ""}

                            {/* DTI Reg. No. */}
                            {selectedBusinessType?.shortname == "INDV" ?
                            <GridItem colSpan={[12, 12, 12, 3]}>
                                <Field name='other.dti_registration_number'>
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form?.errors['other.dti_registration_number'] && form.touched?.other.dti_registration_number} 
                                            isRequired={false}
                                        >
                                            <FormLabel 
                                                htmlFor={'other.dti_registration_number'}
                                                fontSize={12}
                                            >
                                                DTI Registry No.
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='dti_registration_number' 
                                                placeholder='' 
                                                fontSize={13}
                                            />
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form?.errors['other.dti_registration_number'] instanceof Map ? form?.errors['other.dti_registration_number'].map((d, i) => {
                                                        return d;
                                                    }) : form?.errors['other.dti_registration_number']
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ""}

                            {/* DTI Registration Date */}
                            {selectedBusinessType?.shortname == "INDV" ?
                            <GridItem colSpan={[12, 12, 12, 3]}>
                                <Field name='other.dti_registration_date'>
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form?.errors['other.dti_registration_date'] && form.touched?.other.dti_registration_date} 
                                            isRequired={false}
                                        >
                                            <FormLabel 
                                                htmlFor={'other.dti_registration_date'}
                                                fontSize={12}
                                            >
                                                DTI Registry Date.
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='dti_registration_date' 
                                                placeholder='' 
                                                fontSize={13}
                                            />
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form?.errors['other.dti_registration_date'] instanceof Map ? form?.errors['other.dti_registration_date'].map((d, i) => {
                                                        return d;
                                                    }) : form?.errors['other.dti_registration_date']
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ""}

                            {/* SEC Company Name */}
                            {selectedBusinessType?.shortname == "CORP" ||  selectedBusinessType?.shortname == "PRTN" || selectedBusinessType?.shortname == "COOP" ?
                            <GridItem colSpan={[12, 12, 12, 8]}>
                                <Field name='taxpayer_name'>
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form?.errors?.taxpayer_name && form.touched?.taxpayer_name} 
                                            isRequired={false}
                                        >
                                            <FormLabel 
                                                htmlFor={'taxpayer_name'}
                                                fontSize={12}
                                            >
                                                SEC Registered {selectedBusinessType?.fullname} Name
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='taxpayer_name' 
                                                placeholder='' 
                                                fontSize={13}
                                            />
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form?.errors?.taxpayer_name instanceof Map ? form?.errors?.taxpayer_name.map((d, i) => {
                                                        return d;
                                                    }) : form?.errors?.taxpayer_name
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ""}

                            {/* SEC Registration No. */}
                            {selectedBusinessType?.shortname == "CORP" ||  selectedBusinessType?.shortname == "PRTN" || selectedBusinessType?.shortname == "COOP" ?
                            <GridItem colSpan={[12, 12, 12, 4]}>
                                <Field name='other.sec_registration_number'>
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form?.errors['other.sec_registration_number'] && form.touched?.other.sec_registration_number} 
                                            isRequired={false}
                                        >
                                            <FormLabel 
                                                htmlFor={'other.sec_registration_number'}
                                                fontSize={12}
                                            >
                                                SEC Registration No.
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='sec_registration_number' 
                                                placeholder='' 
                                                fontSize={13}
                                            />
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form?.errors['other.sec_registration_number'] instanceof Map ? form?.errors['other.sec_registration_number'].map((d, i) => {
                                                        return d;
                                                    }) : form?.errors['other.sec_registration_number']
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ""}

                            {/* CDA Registered Name */}
                            {selectedBusinessType?.shortname == "COOP" ?
                            <GridItem colSpan={[12, 12, 12, 8]}>
                                <Field name='taxpayer_name'>
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form?.errors?.taxpayer_name && form.touched?.taxpayer_name} 
                                            isRequired={false}
                                        >
                                            <FormLabel 
                                                htmlFor={'taxpayer_name'}
                                                fontSize={12}
                                            >
                                                CDA Registered Name
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='taxpayer_name' 
                                                placeholder='' 
                                                fontSize={13}
                                            />
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form?.errors?.taxpayer_name instanceof Map ? form?.errors?.taxpayer_name.map((d, i) => {
                                                        return d;
                                                    }) : form?.errors?.taxpayer_name
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ""}

                            {/* CDA Registration Number */}
                            {selectedBusinessType?.shortname == "COOP" ?
                            <GridItem colSpan={[12, 12, 12, 4]}>
                                <Field name='other.cda_registration_number'>
                                    {({ field, form }) => (
                                        <FormControl 
                                            isInvalid={form?.errors['other.cda_registration_number'] && form.touched?.other.cda_registration_number} 
                                            isRequired={false}
                                        >
                                            <FormLabel 
                                                htmlFor={'other.cda_registration_number'}
                                                fontSize={12}
                                            >
                                                CDA Registration Number
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='cda_registration_number' 
                                                placeholder='' 
                                                fontSize={13}
                                            />
                                            <FormErrorMessage 
                                                textAlign={'left'}
                                                fontSize={12}
                                            >
                                                {
                                                    form?.errors['other.cda_registration_number'] instanceof Map ? form?.errors['other.cda_registration_number'].map((d, i) => {
                                                        return d;
                                                    }) : form?.errors['other.cda_registration_number']
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            : ""}
                        </Grid>
                    </Form>
                </FormikProvider>
            </Box>
            
        </Fragment>
        
    );
}

export default function CreateApplication () {
    const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
        initialStep: 0,
    })

    const [loading, setLoading] = useState(false);

    const _steps = [
        {
            label: 'Business Information',
            description: '',
            component: <BusinessInformation />
        },
        {
            label: 'Upload Documents',
            description: '',
            component: <BusinessInformation />
        },
        {
            label: 'Submit',
            component: <BusinessInformation />
        }
    ];

    return (
        <Fragment>
            <Helmet>
                <title>Create New Application</title>
            </Helmet>
            <Container 
                maxWidth={'1200px'}
                py={[5, 5, 5, 5, 10]}
                
            >
                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={[2, 5, 10, 10]}>
                    <GridItem 
                        colSpan={[12, 12, 6, 6, 6]} 
                        maxWidth={'100%'}
                    >
                        <Heading 
                            color={'brand.300'}
                            fontSize={['150%']}
                            cursor={'pointer'}
                        >
                            Create New Application
                        </Heading>
                    </GridItem>
                    <GridItem 
                        colSpan={[12, 12, 6, 6, 6]} 
                        maxWidth={'100%'}
                    >
                        <Stack 
                            direction={'row'}
                            justify={'end'}
                        >
                            <Link to={'/application'} style={{
                                width: '100%',
                                textAlign: 'right'
                            }}>
                                <Button 
                                    width={['100%', '100%', 'auto', 'auto']}
                                    my={[3, 0, 0, 0]}
                                    colorScheme={'brand.200'} 
                                    variant={'outline'}
                                    fontSize={13}
                                    px={4}
                                    py={2}
                                    borderRadius={'full'}
                                    fontWeight={600}
                                >
                                    <BiChevronLeft fontSize={25} />
                                    <Text ml={0}>
                                        Go Back
                                    </Text>
                                </Button>
                            </Link>
                            
                        </Stack>
                    </GridItem>
                </Grid>
                <Box
                    bg={'white'}
                    width={'100%'}
                    borderRadius={10}
                    border={'1px solid'}
                    borderColor={'gray.200'}
                    mt={5}
                    overflowX={'auto'}
                    shadow={'xl'}
                >
                    <Stack 
                        direction={'column'}
                        width={'100%'} 
                    >
                        <Steps 
                            px={[4, 4, 4, '10em', '15em']} 
                            py={'1.2em'} 
                            bg={{
                                base: 'white',
                                md: 'gray.50'
                            }}
                            alignItems={'center'} 
                            orientation={'horizontal'} 
                            colorScheme={'brand'} 
                            activeStep={activeStep} 
                            justifyContent={'start'}
                            width={'100%'}
                            minWidth={'100%'}
                        >
                            {_steps.map(({label, description, component}, i) => (
                            <Step 
                                label={
                                    <Text color={'blackAlpha.800'} fontSize={14}>
                                        {label}
                                    </Text>
                                } 
                                description={
                                    <Text fontSize={12}>
                                        {description}
                                    </Text>
                                } 
                                key={i}
                                width={['100%', '100%', 'auto', 'auto']}
                            >
                                {component}
                            </Step>
                            ))}
                        </Steps>
                    </Stack>
                    

                </Box>
            </Container>
        </Fragment>
    )
}