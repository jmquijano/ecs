import { Grid, GridItem, Container, Heading, Text, Button, Stack, Box, FormControl, Input, FormLabel, FormErrorMessage, Select, Divider } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { BiArrowToLeft, BiCaretRight, BiChevronLeft, BiPlus } from "react-icons/bi"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async";
import { Step, Steps, useSteps } from "chakra-ui-steps"
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik, Field } from "formik";
import { fetchBusinessType, fetchCertificateType } from "../../../utils/basedata";

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
        businesstype: Yup.number().required("Business Type is a mandatory field.").nullable(false, 'n'),
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
        enableReinitialize: true
    });

    const [certificateType, setCertificateType] = useState();
    const [businessType, setBusinessType] = useState([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState({});
   
    useEffect(() => {
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
    }, []);

    const handleBusinessTypeChange = async (e) => {
        let _id = e?.target?.value;
        const _f = businessType.filter(x => x.id == _id);
        setSelectedBusinessType(_f[0]);

        console.log(_f[0]);
    }   

    return (
        <Fragment>
            <Box px={[5, 5, 5, 10]} py={5}>
                <FormikProvider value={formikInit}>
                    <Form>
                        <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={4}>
                            {/* Primary Information */}
                            <GridItem 
                                colSpan={12} 
                                mt={4}
                            >
                                <Box
                                    display={'block'}
                                    borderTop={'4px solid'}
                                    borderColor={'brand.200'}
                                    height={'auto'}
                                >
                                    <Text
                                        as={'Span'}
                                        bg={'brand.200'} 
                                        color={'white'}
                                        display={'inline-block'} 
                                        mt={0} 
                                        py={2}
                                        px={3}
                                        fontSize={13}
                                        fontWeight={600}
                                        minWidth={'200px'}
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
                            <GridItem colSpan={[12, 12, 12, 3]}>
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
                                                fontSize={14}
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
                            <GridItem colSpan={[12, 12, 12, 3]}>
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
                                                fontSize={14}
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
                            <GridItem colSpan={[12, 12, 12, 6]}>
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
                                                fontSize={14}
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

                            {/* Location */}
                            {
                                selectedBusinessType?.id >= 1 ?
                                <GridItem 
                                    colSpan={12} 
                                    mt={4}
                                >
                                    <Box
                                        display={'block'}
                                        borderTop={'4px solid'}
                                        borderColor={'brand.200'}
                                        height={'auto'}
                                    >
                                        <Text
                                            as={'Span'}
                                            bg={'brand.200'} 
                                            color={'white'}
                                            display={'inline-block'} 
                                            mt={0} 
                                            py={2}
                                            px={3}
                                            fontSize={13}
                                            fontWeight={600}
                                            minWidth={'200px'}
                                        >
                                            Business Location
                                        </Text>
                                    </Box>
                                    
                                </GridItem>
                                : ''
                            }

                            {/* Primary Information */}
                            <GridItem 
                                colSpan={12} 
                                mt={4}
                            >
                                <Box
                                    display={'block'}
                                    borderTop={'4px solid'}
                                    borderColor={'brand.200'}
                                    height={'auto'}
                                >
                                    <Text
                                        as={'Span'}
                                        bg={'brand.200'} 
                                        color={'white'}
                                        display={'inline-block'} 
                                        mt={0} 
                                        py={2}
                                        px={3}
                                        fontSize={13}
                                        fontWeight={600}
                                        minWidth={'200px'}
                                    >
                                        Business Lines
                                    </Text>
                                </Box>
                                
                            </GridItem>
                            
                            {/* Other Information */}
                            {
                                selectedBusinessType?.id >= 1 ?
                                <GridItem 
                                    colSpan={12} 
                                    mt={4}
                                >
                                    <Box
                                        display={'block'}
                                        borderTop={'4px solid'}
                                        borderColor={'brand.200'}
                                        height={'auto'}
                                    >
                                        <Text
                                            as={'Span'}
                                            bg={'brand.200'} 
                                            color={'white'}
                                            display={'inline-block'} 
                                            mt={0} 
                                            py={2}
                                            px={3}
                                            fontSize={13}
                                            fontWeight={600}
                                            minWidth={'200px'}
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
                                                fontSize={14}
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
                                                fontSize={14}
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
                                                fontSize={14}
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
                                                fontSize={14}
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
                                                fontSize={14}
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
                                                CDA Registered Name
                                            </FormLabel>
                                            <Input 
                                                {...field} 
                                                id='taxpayer_name' 
                                                placeholder='' 
                                                fontSize={14}
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
                                                fontSize={14}
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
                        colSpan={[12, 6, 6, 6, 6]} 
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
                        colSpan={[12, 6, 6, 6, 6]} 
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
                                    width={['100%', 'auto', 'auto', 'auto']}
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
                                        Back to My Application
                                    </Text>
                                </Button>
                            </Link>
                            
                        </Stack>
                    </GridItem>
                </Grid>
                <Box
                    bg={'white'}
                    width={'100%'}
                    minHeight={'60vh'}
                    borderRadius={10}
                    border={'1px solid'}
                    borderColor={'gray.200'}
                    mt={5}
                    overflowX={'auto'}
                >
                    <Stack direction={'column'} visibility={['hidden', 'hidden', 'visible', 'visible']}>
                        <Steps 
                            px={[4, 4, 4, '15em']} 
                            py={'1.2em'} 
                            background={'gray.50'} 
                            alignItems={'center'} 
                            orientation={'horizontal'} 
                            colorScheme={'brand'} 
                            activeStep={activeStep} 
                            justifyContent={'start'}
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