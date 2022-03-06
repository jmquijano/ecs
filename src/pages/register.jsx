import React, { Component, Fragment, useState } from 'react';
import '../css/login.css';
import '../css/app.css';
import '../libs/bootstrap/css/bootstrap.min.css';
import { Helmet } from "react-helmet-async";
import { Badge, Box, Button, Center, Divider, FormControl, FormLabel, Image, Input, Text, VStack, HStack, Stack, Container, SimpleGrid, Grid, GridItem, Flex } from "@chakra-ui/react";
import ecs_logo from '../assets/images/ECS-Logo-300dpi.png';
import { PulseLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { PageBaseUrl } from '../utils/urlbase';
import { Step, Steps, useSteps } from "chakra-ui-steps"


export default function Register() {
    const navigate = useNavigate();
    const [loadingState, setLoadingState] = useState(false);

    const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]

    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })

    return (
        <React.Fragment>
            <div>
                <Helmet title={'Register'}></Helmet>
            </div>
            <Center bg={'gray.50'} py={10}>
                <Box 
                    width={'100%'}
                    maxWidth={500} 
                    textAlign={'center'}
                >
                    <Center marginBottom={5}>
                        <Image src={ecs_logo} width={'auto'} height={'40px'} textAlign={'center'} />
                        <Text
                            color={'gray.500'}
                            fontWeight={'500'}
                            paddingX={'15px'}
                            display={{
                                base: 'none',
                                md: 'block',
                                
                            }}
                        >
                            Electronic Certification System
                        </Text>
                    </Center>
                    
                    { /* Login Card */ }
                    <Box 
                        marginX={{
                            base: 5,
                            md: 0
                        }}
                    >
                        <Box 
                            bg={'white'} 
                            width={'100%'}
                            maxWidth={500} 
                            
                            border={'1px'}
                            borderColor={'gray.200'}
                            paddingX={{
                                base: 5,
                                md: 10

                            }}
                            paddingY={{
                                base: 5,
                                md: 10
                            }}
                        >
                            <Box flexDir={'column'} width={'100%'} justifyContent={'start'}>
                                <Steps orientation={'horizontal'} colorScheme={'brand'} activeStep={activeStep} justifyContent={'start'} marginY={5}>
                                    <Step label={'Step 1'} key={1}>
                                        <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                                            <GridItem colSpan={12}>
                                                <Box width={'100%'}>
                                                    <FormControl isRequired>
                                                        <FormLabel htmlFor={'UserID'}>User ID</FormLabel>
                                                        <Input id={'UserID'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={12}>
                                                <Box width={'100%'}>
                                                    <FormControl isRequired>
                                                        <FormLabel htmlFor={'Email'}>Email address</FormLabel>
                                                        <Input id={'Email'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={12}>
                                                <Box width={'100%'}>
                                                    <FormControl isRequired>
                                                        <FormLabel htmlFor={'Mobile'}>Mobile Number</FormLabel>
                                                        <Input id={'Mobile'} type={'tel'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={6}>
                                                <Box width={'100%'}>
                                                    <FormControl isRequired>
                                                        <FormLabel htmlFor={'Password'}>Password</FormLabel>
                                                        <Input id={'Password'} type={'password'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={6}>
                                                <Box width={'100%'}>
                                                    <FormControl isRequired>
                                                        <FormLabel htmlFor={'ConfirmPassword'}>Confirm Password</FormLabel>
                                                        <Input id={'ConfirmPassword'} type={'password'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                        </Grid>
                                    </Step>
                                    <Step label={'Step 2'} key={2}>
                                        <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                                            <GridItem colSpan={12}>
                                                <Box width={'100%'}>
                                                    <FormControl isRequired>
                                                        <FormLabel htmlFor={'FirstName'}>Salutation</FormLabel>
                                                        <Input id={'FirstName'} type={'text'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={6}>
                                                <Box width={'100%'}>
                                                    <FormControl isRequired>
                                                        <FormLabel htmlFor={'FirstName'}>First name</FormLabel>
                                                        <Input id={'FirstName'} type={'text'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={6}>
                                                <Box width={'100%'}>
                                                    <FormControl>
                                                        <FormLabel htmlFor={'MiddleName'}>Middle name</FormLabel>
                                                        <Input id={'MiddleName'} type={'text'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            <GridItem colSpan={12}>
                                                <Box width={'100%'}>
                                                    <FormControl>
                                                        <FormLabel htmlFor={'LastName'}>Last name</FormLabel>
                                                        <Input id={'LastName'} type={'text'} />
                                                    </FormControl>
                                                </Box>
                                            </GridItem>
                                            
                                        </Grid>
                                    </Step>
                                    <Step label={'Step 3'} key={3}>
                                        
                                    </Step>
                                </Steps>
                                
                            </Box>
                            <VStack spacing={5}>
                                
                                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={0} my={5}>
                                    {activeStep >= 1 ?
                                    (
                                    <GridItem colSpan={6}>
                                        <Button 
                                            isLoading={loadingState}
                                            spinner={<PulseLoader size={8} color='white' />}
                                            colorScheme={'brand'}
                                            variant={'outline'} 
                                            width={'100%'}
                                            onClick={prevStep}
                                            borderTopRightRadius={0}
                                            borderBottomRightRadius={0}
                                        >
                                            {activeStep >= 1 ? "Back" : ""}
                                        </Button>
                                    </GridItem>
                                    ) : null}
                                    <GridItem colSpan={activeStep >= 1 ? 6 : 12}>
                                        <Button 
                                            isLoading={loadingState}
                                            spinner={<PulseLoader size={8} color='white' />}
                                            colorScheme={'brand'} 
                                            width={'100%'}
                                            onClick={() => {
                                                nextStep();
                                                if (activeStep >= 2) {
    
                                                } else {
    
                                                }
                                            }}
                                            
                                            borderTopLeftRadius={activeStep >= 1 ? 0 : 'base'}
                                            borderBottomLeftRadius={activeStep >= 1 ? 0 : 'base'}
                                        >
                                            {activeStep >= 2 ? "Verify" : "Next"}
                                        </Button>
                                    </GridItem>
                                </Grid>
                            </VStack>

                            <Divider marginY={5} color={'gray.100'} />

                            <Stack spacing={2} justifyContent={'center'}>
                                <Box width={'100%'}>
                                    <Text
                                        fontSize={12}
                                        color={'blackAlpha.600'}
                                    >
                                        Already have an account?
                                    </Text>
                                    
                                </Box>
                                <Box>
                                    
                                    <Button 
                                        isLoading={loadingState}
                                        spinner={<PulseLoader size={8} color='white' />}
                                        variant={'outline'}
                                        size={'sm'}
                                        paddingX={5}
                                        paddingY={5}
                                        onClick={(e) => navigate(PageBaseUrl.Auth.Login)}
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box> 
                    

                    {/* Copyright & Application Information */}
                    <Box marginTop={5}>
                        <Text 
                            display={'block'}
                            fontSize={14}
                            color={'gray.400'}
                            cursor={'pointer'}
                            marginX={1}
                        >
                            © {new Date().getFullYear()} {process.env.REACT_APP_NAME}
                        </Text>
                        <Box 
                            display={'block'}
                            fontSize={14}
                            color={'gray.400'}
                            cursor={'pointer'}
                            my={1}
                            
                        >
                            {/**
                            <Text display={'inline'}>Developer Information</Text>
                            <Text display={'inline'}> - </Text>
                            */}
                            <Badge colorScheme={'green'} textTransform={'none'}>v{process.env.REACT_APP_VERSION}</Badge>
                            
                        </Box>
                        
                    </Box>
                </Box>
            </Center>
            
            
        </React.Fragment>
        
    );
}
