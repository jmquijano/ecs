import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react"
import { BiBuilding, BiChevronLeft, BiFile, BiInfoCircle } from "react-icons/bi"
import BusinessInformation from "../../../../components/portal/application/manage/businessinformation";
import MenuTabs from "../../../../components/portal/application/manage/menutabs";
import TabItem from "../../../../components/portal/application/manage/tabitem";
import PageContainer from "../../../../components/portal/reusable-layout/containers/PageContainer"
import { RiVideoChatLine } from "react-icons/ri";

export default function ApplicationManage() {
    useEffect(() => {
        console.log('test');
    }, []);
    return (
        <PageContainer
            title={'Manage'}
            heading={{
                title: 'Manage',
                menu: [
                    {
                        to: '/application',
                        icon: <BiChevronLeft size={20} />,
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
                    <BusinessInformation />
                </TabItem>
                <TabItem 
                    title={'Documents'}
                    icon={<BiFile size={20} />}
                >

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
            </MenuTabs>
        </PageContainer>
    )
}