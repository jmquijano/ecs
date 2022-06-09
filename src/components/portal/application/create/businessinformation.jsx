import { Box, Button, Checkbox, FormControl, Grid, GridItem, Stack, Text, useStyleConfig } from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ZeroPadding from "../../../misc/zeropadding";
import BusinessLines from "./businesslines";
import BusinessLocation from "./businesslocation";
import { DataPrivacyPolicyModal, LoadingModal } from "./modals";
import OtherInformation from "./otherinformation";
import PreferredInspection from "./preferredinspection";
import PrimaryInformation from "./primaryinformation";
import { ApiBaseUrl, PageBaseUrl, PageRouteWithParam } from "../../../../utils/urlbase";
import moment from "moment";
// import { fetchBusinessType, fetchCertificateType, fetchBirRDO, fetchInspectionType } from "../../../../utils/fetch/basedata";
// import { fetchBarangay, fetchCity, fetchProvince } from "../../../utils/fetch/boundaries";
import { HandleGeolocPermission } from "../../../maps";
import { fetchBirRDO, fetchBusinessType, fetchCertificateType, fetchInspectionType } from "../../../../utils/fetch/basedata";
import { fetchBarangay, fetchCity, fetchProvince } from "../../../../utils/fetch/boundaries";

export default function BusinessInformation(props) {
    const { Applicant } = ApiBaseUrl;

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
        },
        agreement: {
            allowToContact: false,
            dpp: false
        }
    });

    const navigate = useNavigate();

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
        preferred_inspectionscheduke: Yup.object().shape({
            day: Yup.string().required("Preferred day is mandatory field.").typeError("Preferred day is mandatory field."),
            time: Yup.string().required("Preferred time is mandatory field.").typeError("Preferred time is mandatory field.")
        })
    });

    const formikSubmitHandler = async (values, { setErrors, resetForm, errors }) => {
        setLoading({
            ...loading,
            general: true
        });

        // console.log(values);

        values = {
            ...values,
            other: {
                ...values?.other,
                date_of_birth: moment(values?.other?.date)?.format('YYYY-MM-DD')
            },
            draftmode: true
        }

        const { url, method, headers } = Applicant?.Application?.Create; 
        const _f = fetch(Applicant?.Base + url, {
            method: method,
            headers: {
                ...headers,
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(values)
        });

        _f
        .then(res => res.json())
        .then((res) => {
            if (res?.success) {
                navigate(
                    PageRouteWithParam({
                        'id': res?.data?.id,
                        'path': 'file'
                    }, PageBaseUrl?.Application?.New?.WithType)
                )
            }
            
        })
        .finally(r => {
            setLoading({
                ...loading,
                general: false
            });
        });
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
            barangay: false,
            bir_rdo: false,
            psic_search: false,
            preferred_inspectiontype: false
        }
    });
    
    const [certificateType, setCertificateType] = useState();
    const [businessType, setBusinessType] = useState([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState({});

    const [birRdo, setBirRdo] = useState([]);
    const [inspectionType, setInspectionType] = useState([]);
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
    });

    const [tin, setTin] = useState({
        tin1: "000",
        tin2: "000",
        tin3: "000",
        tin4: "00000"
    });
   
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

                    const _types = res?.data?.filter(x => x.shortname == 'FSIC');
                    formikInit?.setFieldValue('certificatetype', _types[0]?.id);
                    
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

        fetchBirRDO(() => {
            setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    bir_rdo: true
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setBirRdo(res?.data);
                }
            })
            .finally(e => 
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        bir_rdo: false
                    }
                })
            )

        fetchInspectionType(() => {
            setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    preferred_inspectiontype: true
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setInspectionType(res?.data);
                }
            })
            .finally(e => 
                setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        preferred_inspectiontype: false
                    }
                })
            )
    }, []);

    useEffect(() => {
        formikInit?.setFieldValue('geomap', {
            longitude: pinMap?.lng,
            latitude: pinMap?.lat
        })
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

    const datePickerStyle = useStyleConfig('theme');

    const handleDateOfBirthChange = async (date) => {
        formikInit?.setFieldValue('other.date_of_birth', date);
    }

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
    }, [tin])
    
    const [businessLines, setBusinessLines] = useState([]);
    const handleChangeBusinessLine = async (e) => {
        if (e !== null) {
            setBusinessLines([
                ...businessLines,
                e
            ]);
            
        }
    }

    const handleRemoveBusinessLine = async (a, i) => {
        a = a?.splice(0);
        a?.splice(i, 1);

        setBusinessLines(a);
    }

    useEffect(() => {
        let _id = [];
        businessLines?.map((d) => {
            _id.push(d?.id);
        });

        formikInit?.setFieldValue("businessline", _id);
    }, [businessLines])

    const handlePrefTimeChange = (e) => {
        formikInit?.setFieldValue('preferred_inspectionschedule.time', e);
    }

    // Data Privacy Policy 
    const [dppModal, setDppModal] = useState(false);
    const toggleDppModal = () => {
        

        if (!dppModal) {
            setDppModal(true);
        } else {
            setDppModal(false);
        }
    }
    const handleAgreeDpp = (e) => {
        formikInit?.setFieldValue('agreement.dpp', true);
        toggleDppModal();
    }

    return (
        <Fragment>
            <LoadingModal isOpen={loading?.general} />
            <DataPrivacyPolicyModal 
                isOpen={dppModal}
                onAgree={handleAgreeDpp} 
                onClose={toggleDppModal}
            />
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

                            {/**
                             * Business Lines
                             */}
                            {
                            selectedBusinessType?.id >= 1 ?
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
                            :
                            ''
                            }
                            
                            {
                            /**
                             * Business Location
                             */
                            selectedBusinessType?.id >= 1 ?
                            <BusinessLocation
                                province={{
                                    onChange: handleProvinceChange,
                                    data: province,
                                    loading: loading?.field?.province
                                }}
                                city={{
                                    onChange: handleCityChange,
                                    data: city,
                                    loading: loading?.field?.city
                                }}
                                barangay={{
                                    onChange: handleBarangayChange,
                                    data: barangay,
                                    loading: loading?.field?.barangay
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
                            : ''
                            }
                            
                            
                            {
                            /**
                             * Other Information
                             */
                            selectedBusinessType?.id >= 1 ?
                            <OtherInformation 
                                businesstype={{
                                    selected: selectedBusinessType
                                }}
                                other={{
                                    tin1: e => handleTinChange(1, e),
                                    tin2: e => handleTinChange(2, e),
                                    tin3: e => handleTinChange(3, e),
                                    tin4: e => handleTinChange(4, e),
                                    rdo_code: {
                                        data: birRdo
                                    }
                                }}
                            />
                            : ''
                            }
                            
                            {
                                /**
                                 * Preferred Inspection
                                 */
                            }
                            {selectedBusinessType?.id >= 1 ? 
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
                            :
                            ''
                            }

                            {
                            selectedBusinessType?.id >= 1 ?
                            <GridItem
                                colSpan={[12, 12, 12, 12]}
                                textAlign={'left'}
                                mt={3}
                            >
                                <Field
                                    name='agreement.dpp'
                                >
                                    {({field, form}) => (
                                        <FormControl>
                                            <Stack direction={'row'}>
                                                <Checkbox
                                                    {...field}
                                                    colorScheme={'brand'}
                                                    isChecked={form?.values?.agreement?.dpp}
                                                    onChange={formikInit?.handleChange}
                                                >
                                                    
                                                </Checkbox>
                                                <Text cursor='pointer' fontSize={12} onClick={toggleDppModal}>
                                                    I have read, acknowledged and accepted the <Text color={'brand.200'} display={'inline'}>Data Privacy Statement</Text>
                                                </Text>
                                            </Stack>
                                            
                                            
                                        </FormControl>
                                    )}
                                </Field>
                            </GridItem>
                            :
                            ''
                            }

                            <GridItem 
                                colSpan={[12, 12, 12, 12]}
                                textAlign={'right'}
                            >
                                <Field>
                                    {({ field, form }) => (
                                        <Button 
                                            width={['100%', 'auto']}
                                            colorScheme={'brand'}
                                            variant={'active'}
                                            borderRadius={'full'}
                                            fontSize={16}
                                            py={'1em'}
                                            px={'2em'}
                                            fontWeight={400} 
                                            mt={3}
                                            disabled={!form?.values?.agreement?.dpp}
                                            onClick={() => formikInit?.submitForm()}
                                        >
                                                Next
                                        </Button>
                                    )}
                                </Field>
                            </GridItem>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Box>
            
        </Fragment>
    );
}