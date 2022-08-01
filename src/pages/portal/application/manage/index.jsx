import { 
    Text, 
    Badge, 
    Stack, 
    Box, 
    Center,
    Skeleton
} from "@chakra-ui/react";
import { useEffect } from "react"
import { 
    BiBuilding, 
    BiCheck, 
    BiChevronLeft, 
    BiFile, 
    BiInfoCircle, 
    BiMoney 
} from "react-icons/bi"
import BusinessInformation from "../../../../components/portal/application/manage/businessinformation";
import MenuTabs from "../../../../components/portal/application/manage/menutabs";
import TabItem from "../../../../components/portal/application/manage/tabitem";
import PageContainer from "../../../../components/portal/reusable-layout/containers/PageContainer"
import { RiVideoChatLine } from "react-icons/ri";
import { fetchApplicationById } from "../../../../utils/fetch/application";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Documents from "../../../../components/portal/application/manage/documents";
import { Loader } from "../../../../components/loaders";
import { PageHashRoute } from "../../../../utils/urlbase";
import Equipments from "../../../../components/portal/application/manage/equipments";


export default function ApplicationManage() {
    // Loading State
    const [loading, setLoading] = useState(true);

    // Application Data
    const [applicationData, setApplicationData] = useState({});

    const { id, path } = useParams();

    const { hash } = useLocation();

    useEffect(() => {
        fetchApplicationById(
            () => setLoading(true),
            id
        )
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setApplicationData(res?.data);
            } else {

            }

            
        })
        .finally(e => setLoading(false));

        console.log(PageHashRoute(hash));
    }, []);
    return (
        <PageContainer
            title={'Manage'}
            heading={{
                title: (
                    <>
                        <Stack direction={['column', 'row', 'row']} alignItems={'center'}>
                            <Stack direction={'column'} gap={0}>
                                <Skeleton isLoaded={!loading}>
                                    <Text 
                                        textAlign={['center', 'left', 'left']}
                                    >
                                        Manage Application
                                    </Text>
                                </Skeleton>
                                <Skeleton isLoaded={!loading}>
                                    <Text 
                                        my={0}
                                        fontSize={13}
                                        color={'gray.500'}
                                    >
                                        Filing Reference Number: <b>{applicationData?.application_reference_number}</b>
                                    </Text>
                                </Skeleton>
                                
                                
                            </Stack>
                            <Box display={'flex'} gap={1}>
                                <Skeleton isLoaded={!loading}>
                                    <Badge 
                                        variant='solid' 
                                        colorScheme={(applicationData?.status?.policy?.badge_color ?? "green.300")}
                                        textTransform={'none'}
                                        py={2}
                                        px={3}
                                        fontWeight={600}
                                        borderRadius={'full'}
                                        width={'100%'}
                                        display={'block'}
                                        
                                    >
                                        {applicationData?.status?.fullname}
                                    </Badge>
                                </Skeleton>
                            </Box>
                        </Stack>
                    </>
                ),
                leftAdornment: (
                    <>  
                    </>
                ),
                menu: [
                    
                    {
                        to: '/application/new/' + applicationData?.id + '/submit?prompt=true',
                        variant: 'active',
                        icon: <BiCheck size={25} />,
                        text: 'Submit',
                        width: ['100%', '100%', 'auto'],
                        visible: applicationData?.status?.shortname === "DRAFT"
                    },
                    {
                        to: '/application',
                        icon: <BiChevronLeft size={25} />,
                        text: 'Go Back',
                        width: ['100%', '100%', 'auto'],
                        visible: true
                    }
                ]
            }}
            boxProps={{
                borderRadius: 0,
                
            }}
        >
            <MenuTabs
                defaultIndex={0}
            >
                <TabItem 
                    title={'Business Information'} 
                    icon={<BiInfoCircle size={20} />}
                    skeleton={{
                        enable: true,
                        isLoaded: !loading
                    }}
                    tabId={'BusinessInformation'}
                >
                    
                    <BusinessInformation 
                        applicationData={applicationData}
                    />
                </TabItem>
                <TabItem 
                    title={'Documents'}
                    icon={<BiFile size={20} />}
                    skeleton={{
                        enable: true,
                        isLoaded: !loading
                    }}
                    tabId-={'Documents'}
                >
                    <Documents id={id} />
                </TabItem>
                <TabItem 
                    title={'Equipments'}
                    icon={<BiBuilding />}
                    skeleton={{
                        enable: true,
                        isLoaded: !loading
                    }}
                    tabId={'Equipments'}
                >
                    <Equipments />
                </TabItem>
                <TabItem 
                    title={'Virtual Inspection'}
                    icon={<RiVideoChatLine />}
                    skeleton={{
                        enable: true,
                        isLoaded: !loading
                    }}
                >
                </TabItem>
                <TabItem 
                    hidden
                    title={'Payments'}
                    icon={<BiMoney size={20} />}
                    skeleton={{
                        enable: true,
                        isLoaded: !loading
                    }}
                >
                </TabItem>
            </MenuTabs>
        </PageContainer>
        
        
    )
}