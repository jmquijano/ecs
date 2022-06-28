import { Tabs, TabList, Tab, Text, TabPanels, TabPanel } from "@chakra-ui/react";

export default function BusinessInformation(props) {
    return (
        <>
            <Tabs
                variant={'line'}
                colorScheme={'brand'}
                
            >
                <TabList 
                    px={5}
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
                        <Text fontSize={13}>Preferred Inspection</Text>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Text>Primary Information</Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )

}