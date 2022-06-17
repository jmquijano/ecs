import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

export default function ApplicationDetails(props) {
    
    return (
        <Box px={[5, 5, 10, 10]} py={[5, 5, 5, 5]} bg={'green.50'} borderBottom={'1px solid'} borderBottomColor={['transparent', 'transparent', 'gray.200', 'gray.200']}>
            <Grid
                templateColumns={'repeat(12, 1fr)'} 
                width={'100%'} 
                gap={0}
                marginTop={'0px !important'}
            >
                <GridItem colSpan={[12, 12, 6, 4]}>
                    <Stack 
                        direction={['column', 'row', 'row', 'row']} 
                        justifyContent={['start', 'start', 'start', 'start']}
                        textAlign={'left'}
                    >
                        <Text
                            fontSize={13}
                            color={'gray.600'}
                        >
                            Application Reference Number
                        </Text>
                        <Text
                            mt={'0px !important'}
                            fontSize={13}
                            color={'gray.600'}
                            fontWeight={'800'}
                        >
                            {props?.application_reference_number}
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={[12, 12, 6, 4]}>
                    <Stack 
                        direction={['column', 'row', 'row', 'row']} 
                        justifyContent={['start', 'start', 'start', 'start']}
                        textAlign={'left'}
                    >
                        <Text
                            fontSize={13}
                            color={'gray.600'}
                        >
                            Taxpyer Name
                        </Text>
                        <Text
                            mt={'0px !important'}
                            fontSize={13}
                            color={'gray.600'}
                            fontWeight={'800'}
                        >
                            {props?.taxpayer_name}
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={[12, 12, 6, 4]}>
                    <Stack 
                        direction={['column', 'row', 'row', 'row']} 
                        justifyContent={['start', 'start', 'start', 'start']}
                        textAlign={'left'}
                    >
                        <Text
                            fontSize={13}
                            color={'gray.600'}
                        >
                            Business ID
                        </Text>
                        <Text
                            mt={'0px !important'}
                            fontSize={13}
                            color={'gray.600'}
                            fontWeight={'800'}
                        >
                            {props?.business_id}
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={[12, 12, 6, 4]}>
                    <Stack 
                        direction={['column', 'row', 'row', 'row']} 
                        justifyContent={['start', 'start', 'start', 'start']}
                        textAlign={'left'}
                    >
                        <Text
                            fontSize={13}
                            color={'gray.600'}
                        >
                            Province
                        </Text>
                        <Text
                            mt={'0px !important'}
                            fontSize={13}
                            color={'gray.600'}
                            fontWeight={'800'}
                        >
                            {props?.province?.name}
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={[12, 12, 6, 4]}>
                    <Stack 
                        direction={['column', 'row', 'row', 'row']} 
                        justifyContent={['start', 'start', 'start', 'start']}
                        textAlign={'left'}
                    >
                        <Text
                            fontSize={13}
                            color={'gray.600'}
                        >
                            City/Municipality
                        </Text>
                        <Text
                            mt={'0px !important'}
                            fontSize={13}
                            color={'gray.600'}
                            fontWeight={'800'}
                        >
                            {props?.city?.name}
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={[12, 12, 6, 4]}>
                    <Stack 
                        direction={['column', 'row', 'row', 'row']} 
                        justifyContent={['start', 'start', 'start', 'start']}
                        textAlign={'left'}
                    >
                        <Text
                            fontSize={13}
                            color={'gray.600'}
                        >
                            Barangay
                        </Text>
                        <Text
                            mt={'0px !important'}
                            fontSize={13}
                            color={'gray.600'}
                            fontWeight={'800'}
                        >
                            {props?.barangay?.name}
                        </Text>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
    )
}