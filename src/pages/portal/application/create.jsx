import { Text, Stack, Box, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BiChevronLeft } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { Loader } from "../../../components/loaders";
import "react-datepicker/dist/react-datepicker.css";
import { PageBaseUrl, PageRouteWithParam } from "../../../utils/urlbase";
import { fetchApplicationById } from "../../../utils/fetch/application";
import BusinessInformation from "../../../components/portal/application/create/businessinformation";
import PageContainer from "../../../components/portal/reusable-layout/containers/PageContainer";


export default function CreateApplication () {
    const { activeStep, setStep } = useSteps({
        initialStep: 0,
    })

    const [loading, setLoading] = useState(false);

    const handlePrecheckApplicationId = (_id) => {
        fetchApplicationById(
            () => setLoading(true),
            _id
        )
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                if ((res?.data?.status?.shortname).toLowerCase() !== "draft") {
                    navigate(
                        PageRouteWithParam(
                            {
                                'id': res?.data?.id
                            },
                            PageBaseUrl?.Application.Manage?.Index
                        )
                    );
                }
            } else {
                navigate(PageBaseUrl?.Application.Index);
            }
        })
        .catch(res => {
            console.log(res);
        })
        .finally(e => setLoading(false));
    }

    const { id, path } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            if (path !== null) {
                switch (path) {
                    case "file":
                        setStep(1);
                        handlePrecheckApplicationId(id);
                    break;
                }
            }
        } else {
            setStep(0);
        }

        console.log(id);
    }, [id, path]);

    const _steps = [
        {
            label: 'Business Information',
            description: '',
            component: <BusinessInformation />
        },
        {
            label: 'Upload Documents',
            description: '',
            component: <Text></Text>
        },
        {
            label: 'Submit',
            component: <Text></Text>
        }
    ];

    return (
        <PageContainer
            title={'Create New Application'}
            heading={{
                title: 'Create New Application',
                menu: [
                    {
                        to: '/application',
                        icon: <BiChevronLeft fontSize={25} />,
                        text: 'Go Back'
                    }
                ]
            }}
        >
            <Box
                bg={'white'}
                width={'100%'}
                borderRadius={10}
                border={'1px solid'}
                borderColor={'gray.200'}
                mt={0}
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
                        height={'100%'}
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
                            
                            {loading ?  
                            <>
                                <Center height={'40vh'}>
                                    <Loader.Default size={'xl'} thickness={'5px'} />
                                </Center>
                            </>
                            : component}
                        </Step>
                        ))}
                    </Steps>
                </Stack>
                

            </Box>
        </PageContainer>
    )
}