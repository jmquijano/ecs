import { Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Fragment } from "react";

export default function MenuTabs(props) {
    const { children } = props;

    useEffect(() => {
        console.log(children);

        console.log(children instanceof Array)
    }, [props]);
    return (
        <Tabs 
            colorScheme={'brand'}
            _focus={{
                boxShadow: 'none'
            }}
            variant={'enclosed-colored'}
        >
            <TabList 
                pt={0.2} 
                marginLeft={-0.5}
            >
                {
                    children instanceof Array ?
                    children.map(({ props }) => (
                        <Tab px={5} py={5} minWidth={'100% auto'}>
                            {props?.icon ? props?.icon: null}
                            <Text 
                                fontSize={13} 
                                fontWeight={500}
                                {...(props?.icon ? {ml: 2}: null)}
                            >
                                {props.title}
                            </Text>
                            
                        </Tab>
                    )) :
                    null
                }
            </TabList>

            <TabPanels>
                {
                    children instanceof Array ?
                    children.map(({ props }) => (
                        <TabPanel px={0} py={0}>
                            {props.children}
                            
                        </TabPanel>
                    )) :
                    null
                }
                <TabPanel>

                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}