import { 
    Tabs, 
    TabList, 
    Tab, 
    Text, 
    TabPanels, 
    TabPanel, 
    Box, 
    Stack, 
    Container
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import UIButton from "../../../reusable-layout/button/UIButton";
import PrimaryInformation from "./primaryinformation";
import { 
    FormikProvider, 
    useFormik,
    Field,
    Form, 
} from "formik";
import * as Yup from 'yup';
import { 
    fetchBirRDO, 
    fetchBusinessType, 
    fetchCertificateType, 
    fetchInspectionType 
} from "../../../../../utils/fetch/basedata";
import { 
    fetchBarangay, 
    fetchCity, 
    fetchProvince 
} from "../../../../../utils/fetch/boundaries";
import ZeroPadding from "../../../../misc/zeropadding";
import { LoadingModal } from "../../create/modals";
import moment from "moment";
import BusinessLines from "./businesslines";
import BusinessLocation from "./businesslocation";
import OtherInformation from "./otherinformation";
import PreferredInspection from "./preferredinspection";
import { editApplicationById } from "../../../../../utils/fetch/application";

export default function BusinessInformation(props) {
    const { applicationData } = props;

    // Loading state
    const [loading, setLoading] = useState({
        general: false,
        field: {
            businessType: false,
            province: false,
            city: false,
            barangay: false,
            bir_rdo: false,
            psic_search: false,
            preferred_inspectiontype: false
        }
    });

    // Tab state
    const [tab, setTab] = useState(0);

    // Certificate Type State
    const [certificateType, setCertificateType] = useState();

    // Business Type State
    const [businessType, setBusinessType] = useState([]);

    // Selected Business Type State
    const [selectedBusinessType, setSelectedBusinessType] = useState({});

    // Business Lines State
    const [businessLines, setBusinessLines] = useState([]);

    // BIR RDO State
    const [birRdo, setBirRdo] = useState([]);

    // Inspection Type State
    const [inspectionType, setInspectionType] = useState([]);

    // Province State
    const [province, setProvince] = useState([]);

    // City State
    const [city, setCity] = useState([]);

    // Barangay State
    const [barangay, setBarangay] = useState([]);

    // Locate Me State
    const [locateMe, setLocateMe] = useState();

    // Focus Map State
    const [focusMap, setFocusMap] = useState({
        lng: null,
        lat: null
    });

    // Pin Map State
    const [pinMap, setPinMap] = useState({
        lng: null,
        lat: null
    });

    // TIN State
    const [tin, setTin] = useState({
        tin1: "000",
        tin2: "000",
        tin3: "000",
        tin4: "00000"
    });

    // Business Location selectedValue State
    const [businessLocationSelectedValue, setBusinessLocationSelectedValue] = useState({
        province: {},
        city: {},
        barangay: {}
    });

    // Initial Form Values
    const [formValues, setFormValues] = useState({
        business_id: null,
        taxpayer_name: null,
        trade_name: null,
        businesstype: null,
        certificatetype: null,
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
        },
        preferred_inspectiontype: null,
        preferred_inspectionschedule: {
            day: null,
            time: null
        }
    });

    // PSGC Selected Value State
    // In this state we store the selected value in full JSON array format.
    const [psgcSelectedValue, setPsgcSelectedValue] = useState({
        city: {
            id: null,
            name: null,
            type: null
        },
        barangay: {
            id: null,
            name: null,
            type: null
        },
        province: {
            id: null,
            name: null,
            type: null
        }
    });

    // Formik Submit Handler
    const formikSubmitHandler = async (values, { setErrors, resetForm, errors }) => {
        

        values = {
            ...values,
            other: {
                ...values?.other,
                date_of_birth: values?.other?.date
            }
        };

        editApplicationById(
            () => setLoading({
                ...loading,
                general: true
            }),
            applicationData?.id,
            values
        )
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                
            } else {
                alert(res?.message);
                setErrors(res?.errordata);
            }
        })
        .finally(e =>
            setLoading({
                ...loading,
                general: false
            }),    
        );

        console.log(values);
    }

    // Formik Validation Schema
    const validationSchema = Yup.object().shape({
        business_id: Yup.string().required("Business ID is a mandatory field.").typeError("Business ID is a mandatory field."),
        taxpayer_name: Yup.string().required("This is a mandatory field.").typeError("This is a mandatory field."),
        trade_name: Yup.string().nullable(true),
        businesstype: Yup.number().required("Business Type is a mandatory field.").typeError("Business Type is a mandatory field."),
        certificatetype: Yup.string().required("Certificate Type is a mandatory field.").typeError("Certificate Type is a mandatory field."),
        barangay: Yup.number().required("Barangay is a mandatory field.").typeError("Barangay is a mandatory field."),
        city: Yup.number().required("City is a mandatory field.").typeError("City is a mandatory field."),
        province: Yup.number().required("Province is a mandatory field.").typeError("Province is a mandatory field."),
        businessline: Yup.array().of(
            Yup.number().required("Atleast one (1) business line is mandatory.").typeError("Atleast one (1) business line is mandatory.")
        ),
        other: Yup.object().shape({
            tin: Yup.number().nullable(true),
            branch_code: Yup.number().nullable(true),
            rdo_code: Yup.number().nullable(true),
            sec_registration_number: Yup.string().nullable(true),
            date_of_birth: Yup.date().nullable(true)
        }).nullable(true),
        address: Yup.object().shape({
            street: Yup.string().required("Street is a mandatory field.").typeError("Street is a mandatory field.")
        }),
        preferred_inspectiontype: Yup.number().required("Inspection Type is a mandatory field.").typeError("Inspection Type is a mandatory field."),
        preferred_inspectionschedule: Yup.object().shape({
            day: Yup.string().required("Preferred day is mandatory field.").typeError("Preferred day is mandatory field."),
            time: Yup.string().required("Preferred time is mandatory field.").typeError("Preferred time is mandatory field.")
        })
    });

    // Formik Init
    const formikInit = useFormik({
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: formikSubmitHandler,
        dirty: true,
        enableReinitialize: true
    });

    // Handle Tab Change
    const handleTabChange = (e) => {
        setTab(e);
    }

    // Handle Business Type Change
    const handleBusinessTypeChange = async (e) => {
        let _id = e?.target?.value;
        const _f = businessType.filter(x => x.id == _id);
        setSelectedBusinessType(_f[0]);
    }

    // Handle Province Change
    const handleProvinceChange = async (e, form) => {
        let _id = e?.target?.value ?? e;

        // Set PSGC Selected Value
        setPsgcSelectedValue({
            ...psgcSelectedValue,
            province: null
        });

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

    // Handle City Change
    const handleCityChange = async (e) => {
        let _id = e?.target?.value ?? e;

        // Set PSGC Selected Value
        setPsgcSelectedValue({
            ...psgcSelectedValue,
            city: null
        });

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

    // Handle Barangay Change
    const handleBarangayChange = async (e) => {
        let _id = e?.target?.value ?? e;

        // Set PSGC Selected Value
        setPsgcSelectedValue({
            ...psgcSelectedValue,
            barangay: null
        });

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
        }
    }

    // This function is used to fetch the city when the corresponding ID of province is provided.
    const handlePreFetchPSGC = (province, city) => {
        fetchCity(province, () => {
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

        fetchBarangay(city, () => {
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

    // Handle Date of Birth Change
    const handleDateOfBirthChange = async (date) => {
        formikInit?.setFieldValue('other.date_of_birth', date);
    }

    // Handle TIN Change
    const handleTinChange = (o, e) => {
        e = e?.target?.value;
        switch (o) {
            case 1: 
                e = ZeroPadding(e, 3);
                setTin({
                    ...tin,
                    tin1: e
                });
            break;
            case 2:
                e = ZeroPadding(e, 3);
                setTin({
                    ...tin,
                    tin2: e
                });
            break;
            case 3:
                e = ZeroPadding(e, 3);
                setTin({
                    ...tin,
                    tin3: e
                });
            break;
            case 4:
                e = ZeroPadding(e, 5);
                setTin({
                    ...tin,
                    tin4: e
                });
            break;
        }
    }

    useEffect(() => {
        formikInit?.setFieldValue('other.tin', tin?.tin1 + tin?.tin2 + tin?.tin3);
        formikInit?.setFieldValue('other.branch_code', tin?.tin4);
    }, [tin]);

    // Handle Business Line Change
    const handleChangeBusinessLine = async (e) => {
        if (e !== null) {
            setBusinessLines([
                ...businessLines,
                e
            ]);
            
        }
    }

    // Handle Remove Business Line
    const handleRemoveBusinessLine = async (a, i) => {
        a = a?.splice(0);
        a?.splice(i, 1);

        setBusinessLines(a);
    }

    // Handle Preferred Time Change
    const handlePrefTimeChange = (e) => {
        // console.log(e);
        formikInit?.setFieldValue('preferred_inspectionschedule.time', new Date(e).toLocaleTimeString());
    }

    // Run on Mount
    useEffect(() => {
        // Fetch Certificate Type
        fetchCertificateType()
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setCertificateType(res?.data);
                }
                
            });

        // Fetch Business Type
        fetchBusinessType()
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setBusinessType(res?.data);
                }
            });

        // Fetch Province
        fetchProvince(
            () => (
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        province: true
                    }
                })
            )
        )
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
    
                        setFocusMap(coordinates);
                    }
                }
            })
            .finally(e => (
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        province: false
                    }
                })
            ));

        // Fetch BIR RDO
        fetchBirRDO(
            () => (
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        bir_rdo: true
                    }
                })
            )
        )
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setBirRdo(res?.data);
                }
            })
            .finally(e => (
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        bir_rdo: false
                    }
                })
            ));

        // Fetch Inspection Type
        fetchInspectionType(
            () => (
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        preferred_inspectiontype: true
                    }
                })
            )
        )
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setInspectionType(res?.data);
                }
            })
            .finally(e => (
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        preferred_inspectiontype: false
                    }
                })
            ));
    }, []);

    // Monitor post-render changes in props?.applicationdata
    useEffect(() => {
        // Set Business Type
        setSelectedBusinessType(applicationData?.businesstype);

        // Get the ids of applicationData?.businessline[]
        setBusinessLines(applicationData?.businessline);

        // Prefecth PSGC
        handlePreFetchPSGC(applicationData?.province?.id, applicationData?.city?.id);
        
        setPinMap({
            lng: applicationData?.geomap?.longitude,
            lat: applicationData?.geomap?.latitude,
        });

        // Primary Information
        formikInit?.setFieldValue('certificatetype', applicationData?.certificationtype?.id);
        formikInit?.setFieldValue('businesstype', applicationData?.businesstype?.id);
        formikInit?.setFieldValue('business_id', applicationData?.business_id);
        formikInit?.setFieldValue('taxpayer_name', applicationData?.taxpayer_name);
        formikInit?.setFieldValue('trade_name', applicationData?.other_info?.sec?.company_name ?? applicationData?.other_info?.dti?.trade_name ?? applicationData?.taxpayer_name);
        formikInit?.setFieldValue('other.date_of_birth', moment(applicationData?.other_info?.bir?.date_of_birth ?? applicationData?.other_info?.sec?.date_of_incorporation)?.toDate());
        
        // PSGC
        formikInit?.setFieldValue('province', applicationData?.province?.id);
        formikInit?.setFieldValue('city', applicationData?.city?.id);
        formikInit?.setFieldValue('barangay', applicationData?.barangay?.id);

        // Set PSGC Selected Values, for visual purposes only.
        setPsgcSelectedValue({
            province: applicationData?.province,
            city: applicationData?.city,
            barangay: applicationData?.barangay
        });

        // Business Line
        formikInit?.setFieldValue('businessline', applicationData?.businessline?.map(x => x.id));

        // BIR
        formikInit?.setFieldValue('other.tin', applicationData?.other_info?.bir?.tin);
        formikInit?.setFieldValue('other.branch_code', applicationData?.other_info?.bir?.branch_code);
        formikInit?.setFieldValue('other.rdo_code', applicationData?.other_info?.bir?.rdo?.id);
        
        setTin({
            ...tin,
            tin1: applicationData?.other_info?.bir?.tin?.substring(0, 3),
            tin2: applicationData?.other_info?.bir?.tin?.substring(3, 6),
            tin3: applicationData?.other_info?.bir?.tin?.substring(6, 9),
            tin4: applicationData?.other_info?.bir?.branch_code,
        })

        // SEC
        formikInit?.setFieldValue('other.sec_registration_number', applicationData?.other_info?.sec?.registration_number);

        // CDA
        formikInit?.setFieldValue('other.cda_registration_number', applicationData?.other_info?.cda?.registration_number);
        formikInit?.setFieldValue('other.cda_registration_date', applicationData?.other_info?.cda?.registration_date);

        // DTI
        formikInit?.setFieldValue('other.dti_registration_number', applicationData?.other_info?.dti?.registration_number);
        formikInit?.setFieldValue('other.dti_registration_date', applicationData?.other_info?.dti?.registration_date);

        // Address
        formikInit?.setFieldValue('address.street', applicationData?.address?.street);
        formikInit?.setFieldValue('address.room', applicationData?.address?.room);
        formikInit?.setFieldValue('address.building', applicationData?.address?.building);
        formikInit?.setFieldValue('address.landmark', applicationData?.address?.landmark);
        
        // Geomap
        formikInit?.setFieldValue('geomap.longitude', applicationData?.geomap?.longitude);
        formikInit?.setFieldValue('geomap.latitude', applicationData?.geomap?.latitude);

        // Preferred Inspection Type and Schedule
        formikInit?.setFieldValue('preferred_inspectiontype', applicationData?.preferred_inspectiontype?.id);
        formikInit?.setFieldValue('preferred_inspectionschedule', applicationData?.preferred_inspectionschedule);
    }, [props?.applicationData]);

    // Monitor post-render changes in pinMap state
    useEffect(() => {
        formikInit?.setFieldValue('geomap', {
            longitude: pinMap?.lng,
            latitude: pinMap?.lat
        });
    }, [pinMap]);


    // Monitor post-render changes in TIN state
    useEffect(() => {
        formikInit?.setFieldValue('other.tin', tin?.tin1 + tin?.tin2 + tin?.tin3);
        formikInit?.setFieldValue('other.branch_code', tin?.tin4);
    }, [tin]);

    // Monitor post-render changes in Business Lines
    useEffect(() => {
        let _id = [];
        businessLines?.map((d) => {
            _id.push(d?.id);
        });

        formikInit?.setFieldValue("businessline", _id);
    }, [businessLines]);

    return (
        <Fragment>
            <LoadingModal isOpen={loading?.general} />
            <FormikProvider value={formikInit}>
                <Form>
                    <Tabs
                        onChange={handleTabChange}
                        variant={'line'}
                        colorScheme={'brand'}
                        isFitted
                    >
                        <Box maxWidth={'100%'} overflowX={'auto'} overflowY={'hidden'}>
                            <TabList 
                                maxWidth={'100%'}
                                
                                css={{
                                    '&::-webkit-scrollbar': {
                                        display: 'none'
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        display: 'none'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <Tab px={5} py={5}>
                                    <Text fontSize={13}>Primary Information</Text>
                                </Tab>
                                <Tab>
                                    <Text fontSize={13}>Business Lines</Text>
                                </Tab>
                                <Tab>
                                    <Text fontSize={13}>Business Address</Text>
                                </Tab>
                                <Tab>
                                    <Text fontSize={13}>Other Information</Text>
                                </Tab>
                                <Tab>
                                    <Text fontSize={13}>Inspection</Text>
                                </Tab>
                            </TabList>
                        </Box>
                        

                        <TabPanels>
                            <TabPanel minHeight={'30vh'}>
                                {
                                    tab == 0 ?
                                    <Container maxWidth={'100%'} py={2}>
                                        <PrimaryInformation 
                                            certificatetype={{
                                                data: certificateType
                                            }}
                                            businesstype={{
                                                data: businessType,
                                                onChangeCapture: handleBusinessTypeChange,
                                                selected: selectedBusinessType
                                            }}
                                            birthdate={{
                                                onChange: handleDateOfBirthChange
                                            }}
                                        />
                                    </Container>
                                    :
                                    null
                                }
                                
                                
                            </TabPanel>
                            <TabPanel minHeight={'30vh'}>
                                {
                                    tab == 1 ?
                                    <Container maxWidth={'100%'} py={2}>
                                        <BusinessLines
                                            search={{
                                                onChange: handleChangeBusinessLine
                                            }}
                                            table={{
                                                onRemove: handleRemoveBusinessLine,
                                                data: businessLines
                                            }}
                                            formik={formikInit}
                                        />
                                    </Container>
                                    :
                                    null
                                }
                            </TabPanel>
                            <TabPanel minHeight={'30vh'}>
                                {/* Business Address */}
                                {
                                    tab == 2 ?
                                    <Container maxWidth={'100%'} py={2}>
                                        <BusinessLocation 
                                            province={{
                                                onChange: handleProvinceChange,
                                                data: province,
                                                loading: loading?.field?.province,
                                                selected: psgcSelectedValue?.province
                                            }}
                                            city={{
                                                onChange: handleCityChange,
                                                data: city,
                                                loading: loading?.field?.city,
                                                selected: psgcSelectedValue?.city
                                            }}
                                            barangay={{
                                                onChange: handleBarangayChange,
                                                data: barangay,
                                                loading: loading?.field?.barangay,
                                                selected: psgcSelectedValue?.barangay
                                            }}
                                            map={{
                                                position: pinMap,
                                                pin: {
                                                    onChange: (e) => {
                                                        setPinMap({
                                                            ...pinMap,
                                                            lng: e?.lng,
                                                            lat: e?.lat
                                                        });
                                                    }
                                                }
                                            }}
                                            businesstype={{
                                                selected: selectedBusinessType
                                            }}
                                        />
                                    </Container>
                                    
                                    :
                                    null
                                }
                            </TabPanel>
                            <TabPanel minHeight={'30vh'}>
                                 {/* Other Information */}
                                 {
                                    tab == 3 ?
                                    <Container maxWidth={'100%'} py={2}>
                                        <OtherInformation
                                            businesstype={{
                                                selected: selectedBusinessType
                                            }}
                                            other={{
                                                tin1: {
                                                    value: tin?.tin1,
                                                    onChange: e => handleTinChange(1, e)
                                                },
                                                tin2: {
                                                    value: tin?.tin2,
                                                    onChange: e => handleTinChange(2, e)
                                                },
                                                tin3: {
                                                    value: tin?.tin3,
                                                    onChange: e => handleTinChange(3, e)
                                                },
                                                tin4: {
                                                    value: tin?.tin4,
                                                    onChange: e => handleTinChange(4, e)
                                                },
                                                rdo_code: {
                                                    data: birRdo,
                                                    selected: formikInit?.values?.other?.rdo_code,
                                                }
                                            }}
                                        />
                                    </Container>
                                    :
                                    null
                                }
                            </TabPanel>
                            <TabPanel minHeight={'30vh'}>
                                {/* Preferred Inspection */}
                                {
                                    tab == 4 ?
                                    <Container maxWidth={'100%'} py={2}>
                                        <PreferredInspection
                                            inspectiontype={{
                                                data: inspectionType
                                            }}
                                            businesstype={{
                                                selected: selectedBusinessType
                                            }}
                                            preferredtime={{
                                                onChange: handlePrefTimeChange
                                            }}
                                        />
                                    </Container>
                                    :
                                    null
                                }
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                                
                    <Field>
                        {({ field, form }) => (
                            <Box 
                                px={[2, 3, 3, 5, 5]} 
                                py={0}
                                mb={5}
                                borderColor={'gray.200'}
                            >
                                <Stack
                                    px={3}
                                    direction={'row'} 
                                    justifyContent={'start'}
                                >
                                    
                                    <UIButton 
                                        onClick={formikInit?.submitForm}
                                        {...(applicationData?.id == null || applicationData?.id == undefined ? {disabled: true} : null)}
                                    >
                                        Save Changes
                                    </UIButton>
                                </Stack>
                                
                            </Box>
                        )}
                    </Field>
                </Form>
            </FormikProvider>
        </Fragment>
    )

}