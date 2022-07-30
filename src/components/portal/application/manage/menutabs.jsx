import { Center, Container, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loader } from "../../../loaders";

export default function MenuTabs(props) {
    const { children } = props;

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        // console.log(children);

        // console.log(children instanceof Array)
    }, [props]);
    return (
        <Tabs 
            colorScheme={'brand'}
            _focus={{
                boxShadow: 'none'
            }}
            variant={'enclosed-colored'}
            isFitted
        >
            <TabList 
                pt={0.2} 
                marginLeft={-0.5}
                maxWidth={'100%'}
                overflowX={'auto'}
                overflowY={'hidden'}
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
                {
                    children instanceof Array ?
                    children.map(({ props }, id) => {
                        return (props?.hidden === true ?
                        null
                        :
                        <Tab px={5} py={5} width={'100%'}>
                            {props?.icon ?
                                props?.skeleton?.enable ?
                                    props?.skeleton?.isLoaded ? props?.icon : null
                                    :
                                    props?.icon
                                : 
                                null
                            }
                            {props?.skeleton?.enable ?
                                <Skeleton isLoaded={props?.skeleton?.isLoaded}>
                                    <Text 
                                        fontSize={13} 
                                        fontWeight={500}
                                        {...(props?.icon ? {ml: 2}: null)}
                                    >
                                        {props.title}
                                    </Text>
                                </Skeleton>
                                :
                                <Text 
                                    fontSize={13} 
                                    fontWeight={500}
                                    {...(props?.icon ? {ml: 2}: null)}
                                >
                                    {props.title}
                                </Text>
                            }
                            
                        </Tab>)
                        
                        
                    }) :
                    null
                }
            </TabList>

            <TabPanels>
                {
                    children instanceof Array ?
                    children.map(({ props }) => (
                        
                        <TabPanel px={0} py={0}>
                            
                            {
                                props?.skeleton?.enable ?
                                    props?.skeleton?.isLoaded ?
                                    props.children
                                    :
                                    <Center 
                                        minHeight={'40vh'}
                                    >
                                        <Loader.Default 
                                            thickness='4px'
                                            size='lg'
                                        />
                                    </Center>
                                    
                                :
                                props.children
                            }                            
                            
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