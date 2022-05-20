import { Box, Heading, Container, Spacer, Grid, GridItem, Stack, Text, Button } from '@chakra-ui/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { UserProfileContext } from '../../context/UserProfileContext';
import { ApiBaseUrl } from '../../utils/urlbase';
import { ScaleLoader } from 'react-spinners';

function DashboardCounterCardInfo({count, title, description, href, loading}) {
    return (
        <Box
            width={'100%'}
            minHeight={150}
            height={'100%'}
            p={5}
            bg={'rgba(224,90,44, 0.10)'}
            borderRadius={15}
            display={'flex'}
            alignItems={'center'}
        >
            <Stack direction={'column'} width={'100%'}>
                <Stack direction={'column'}>
                    {
                    loading ? <Box py={5} px={2}><ScaleLoader color={'#e05a2c'} /> </Box>
                    :
                    
                    <Text color={'brand.200'} 
                        fontSize={50} 
                        fontWeight={600} 
                        display={'flex'}
                        alignItems={'center'}
                        px={2}
                    >
                        {count}
                    </Text>
                    }
                    <Stack direction={'column'} ps={2} minHeight={'80px'} maxHeight={'80px'}>
                        <Text color={'brand.200'} fontSize={18} fontWeight={600}>{title}</Text>
                        <Text color={'brand.200'} fontSize={12} fontWeight={300}>{description}</Text>
                    </Stack>
                </Stack>
                <Spacer  py={2}/>
                <Button color={'brand.200'} variant={'outline'}>
                    View
                </Button>
            </Stack>
            
        </Box>
    );
}

export default function Home() {
    const userProfile = useContext(UserProfileContext);

    const [loading, setLoading] = useState(false);
    const [widgetCounter, setWidgetCounter] = useState(null);

    const get_greeting = () => {
        const now = (new Date()).getHours();
        let greeting = '';

        if (now < 12) {
            greeting = "Good morning";
        } else if (now < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }
        
        return greeting;
    }

    const fetch_widget_counter = async () => {
        // Token
        const token = localStorage.getItem('token');

        setLoading(true);

        await fetch(
            ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.DashboardWidgets.Counter.url,
            {
                method: ApiBaseUrl.Applicant.DashboardWidgets.Counter.method,
                headers: {
                    ...ApiBaseUrl.Applicant.DashboardWidgets.Counter.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => res.json())
        .then(res => {
            setWidgetCounter(res?.data);
        })
        .finally(() => {
            setLoading(false);
        });

    
    }

    useEffect(() => {
        fetch_widget_counter();
    }, []);

    return (
        <Fragment>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Box
                bg={'gray.100'}
                width={'100%'}
                
                minHeight={150}
                display={'flex'}
                alignItems={'center'}
            >
                <Container
                    maxWidth={'1200px'}
                >
                    <Heading 
                        fontSize={['120%', '140%', '160%', '200%']}
                        color={'brand.300'} 
                        fontWeight={300} 
                        cursor={'pointer'}
                    >                        
                        {get_greeting()}
                        {
                            userProfile?.firstname ? <b fontWeight={600}>{', ' + userProfile?.firstname ?? '...'}</b> 
                            : ''
                        }! 
                    </Heading>
                </Container>
            </Box>
            
            <Spacer my={10} />
            
            <Container
                maxWidth={'1200px'}
                width={'100%'}
                mb={100}
            >
                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={[2, 5, 10, 10]}>
                    <GridItem colSpan={[12, 12, 12, 6, 4]} maxWidth={'100%'}>
                        <DashboardCounterCardInfo 
                            count={widgetCounter?.submitted_application?.count}
                            title={'Submitted Application'}
                            description={'Total count of applications you have submitted.'}
                            loading={loading}
                        />
                        
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6, 4]}>
                        <DashboardCounterCardInfo 
                            count={widgetCounter?.issued_fsic?.count}
                            title={'All Issued FSIC'}
                            description={'Total count of issued FSIC including those expired, revoked and cancelled (if any).'}
                            loading={loading}
                        />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6, 4]}>
                        <DashboardCounterCardInfo 
                            count={widgetCounter?.expiring_fsic?.count}
                            title={'Expiring FSIC'}
                            description={'Total count of issued FSIC which will expire within a month or less, it is adviseable to renew it as soon as possible.'}
                            loading={loading}
                        />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6, 4]}>
                        <DashboardCounterCardInfo 
                            count={widgetCounter?.expired_fsic?.count}
                            title={'Expired FSIC'}
                            description={'Total count of issued FSIC which had already expired, you must renew it now.'}
                            loading={loading}
                        />
                    </GridItem>
                </Grid>
            </Container>
            
        </Fragment>
    );
}