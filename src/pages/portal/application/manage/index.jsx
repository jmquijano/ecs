import { Text, Badge, Stack, Box } from "@chakra-ui/react";
import { useEffect } from "react"
import { BiBuilding, BiChevronLeft, BiFile, BiInfoCircle, BiMoney } from "react-icons/bi"
import BusinessInformation from "../../../../components/portal/application/manage/businessinformation";
import MenuTabs from "../../../../components/portal/application/manage/menutabs";
import TabItem from "../../../../components/portal/application/manage/tabitem";
import PageContainer from "../../../../components/portal/reusable-layout/containers/PageContainer"
import { RiVideoChatLine } from "react-icons/ri";
import { fetchApplicationById } from "../../../../utils/fetch/application";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Documents from "../../../../components/portal/application/manage/documents";

export default function ApplicationManage() {
    // Loading State
    const [loading, setLoading] = useState(true);

    // Application Data
    const [applicationData, setApplicationData] = useState({});

    const { id, path } = useParams();

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
    }, []);
    return (
        <PageContainer
            title={'Manage'}
            heading={{
                title: (
                    <>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Stack direction={'column'} gap={0}>
                                <Text display={'inline'}>Manage Application</Text>
                                <Text 
                                    my={0}
                                    fontSize={13}
                                    color={'gray.500'}
                                >
                                    Filing Reference Number: <b>{applicationData?.application_reference_number}</b>
                                </Text>
                            </Stack>
                            <Box>
                                <Badge 
                                    variant='solid' 
                                    colorScheme='green'
                                    textTransform={'none'}
                                    py={2}
                                    px={3}
                                    fontWeight={600}
                                    borderRadius={'full'}
                                    
                                >
                                    {applicationData?.status?.fullname}
                                </Badge>
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
                        to: '/application',
                        icon: <BiChevronLeft size={25} />,
                        text: 'Go Back'
                    }
                ]
            }}
            boxProps={{
                borderRadius: 0,
                
            }}
        >
            <MenuTabs>
                <TabItem 
                    title={'Business Information'} 
                    icon={<BiInfoCircle size={20} />}
                >
                    <BusinessInformation 
                        applicationData={applicationData}
                    />
                </TabItem>
                <TabItem 
                    title={'Documents'}
                    icon={<BiFile size={20} />}
                >
                    <Documents id={id} />
                </TabItem>
                <TabItem 
                    title={'Equipments'}
                    icon={<BiBuilding />}
                >
                </TabItem>
                <TabItem 
                    title={'Virtual Inspection'}
                    icon={<RiVideoChatLine />}
                >
                </TabItem>
                <TabItem 
                    hidden
                    title={'Payments'}
                    icon={<BiMoney size={20} />}
                >
                </TabItem>
            </MenuTabs>
        </PageContainer>
    )
}