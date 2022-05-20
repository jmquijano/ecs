import { Box, Button, Container, Grid, GridItem, Image, Popover, Stack, Text, PopoverTrigger, PopoverContent, PopoverArrow , Center, Collapse, useDisclosure } from '@chakra-ui/react';
import React, { useState, Fragment, useContext, useRef, forwardRef } from 'react';
import ecs_logo from '../../assets/images/ECS-Logo-300dpi.png';
import { UserProfileContext } from '../../context/UserProfileContext';
import Clock from 'react-live-clock';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ApiBaseUrl, PageBaseUrl } from '../../utils/urlbase';
import { BiMenu, BiUserCircle } from 'react-icons/bi';

import dummy_profile_pic from '../../assets/images/dummy-profile-pic.png';
import { PulseLoader } from 'react-spinners';
import { NavLinks } from '../../utils/navlinks';

const navitems = NavLinks;

const AccountLogout = ({onStart, onEnd}) => {
    const token = localStorage.getItem('token');
    onStart();

    try {
        fetch(
            ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.Revoke.url,
            {
                method: ApiBaseUrl.Applicant.Auth.Revoke.method,
                headers: ApiBaseUrl.Applicant.Auth.Revoke.headers,
                body: JSON.stringify({
                    'access_token': token
                })
            }
        )
        .then(res => res.json())
        .then((res) => {
            if (res?.status) {
                localStorage.removeItem('token');
            }
        })
        .finally(res => {
            onEnd(res);
        });
    } catch (e) {

    }
}

function PopoverAccountNav({mobile}) {
    const userProfile = useContext(UserProfileContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return (
        <Popover
            autoFocus={false}                                    
            placement='bottom'
            closeOnBlur={true}
        >
    
            <PopoverTrigger>
                <Button 
                    bg={'transparent'}
                    px={2}
                    _hover={{
                        bg: 'rgb(224,90,44, 0.10)'
                    }}
                    _focus={{
                        bg: 'transparent'
                    }}
                    _active={{
                        bg: 'rgb(224,90,44, 0.10)'
                    }}
                    
                    color={'brand.300'}
                    
                    
                >
                    <BiUserCircle size={25} />
                    <Text fontSize={13} ms={2}>
                        Account
                    </Text>
                    
                </Button>
            </PopoverTrigger>
            

            <PopoverContent
                mr={5}
                borderRadius={10}
                _focus={{
                    outline: 'none'
                }}
                shadow={'xl'}
                outline={'none'}
                width={'auto'}
                minWidth={300}
            >
                <PopoverArrow />
                <Container 
                    px={5}
                    py={5}
                >
                    <Center mb={5}>
                        <Text
                            color={'gray.600'}
                            fontWeight={'bold'}
                            cursor={'pointer'}
                        >
                            My Account
                        </Text>
                    </Center>
                    <Stack direction={'row'}>
                        <Image
                            borderRadius='full'
                            src={dummy_profile_pic}
                            width={'50px'}
                            height={'50px'}
                        />
                        <Stack direction={'column'}>
                            <Text 
                                m={0}
                                color={'gray.700'}
                            >
                                {userProfile?.firstname} {userProfile?.middlename} {userProfile?.lastname}
                            </Text>
                            
                            <Text 
                                marginTop={'0px !important'} 
                                cursor={'pointer'} 
                                fontSize={13}
                                color={'brand.500'}
                            >
                                <Link to={PageBaseUrl.User.Profile}>
                                    View Profile
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Container>
                
                <Button 
                    colorScheme={'brand'} 
                    borderTopRadius={0}
                    onClick={() => {
                        AccountLogout({
                            onStart: e => setLoading(true),
                            onEnd: e => {
                                navigate(PageBaseUrl.Auth.Login);
                                setLoading(false);
                            }
                        });
                    }}
                    fontSize={12}
                >
                    {
                        loading ? <PulseLoader color={'white'} size={8}/> : 'Logout'
                    }
                </Button>
                
            </PopoverContent>
        </Popover>
    );
}

function CustomIconButton({icon, text, children, ...props }) {
    return (
        <Fragment>
            <Button 
                bg={'transparent'}
                px={2}
                _hover={{
                    bg: 'rgb(224,90,44, 0.10)'
                }}
                _focus={{
                    bg: 'transparent'
                }}
                _active={{
                    bg: 'rgb(224,90,44, 0.10)'
                }}
                color={'brand.300'}
                {...props}

            >
                {icon}
                <Text fontSize={13} ms={text ? 2 : 0}>
                    {text}
                </Text>
                
            </Button>
            {children}
        </Fragment>
        
    );
}

function DesktopNavButton({path, children, variant, startsWith}) {
    const location = useLocation();

    const active = (path, startsWith = false) => {
        // console.log(location.pathname);
        if (path == location.pathname) {
            return true;
        } else if (startsWith) {
            const doesItStartWith = (location.pathname).startsWith(path);
            return doesItStartWith;
        } else {
            return false;
        }
    }

    return (
        <Link to={path}>
            <Button 
                colorScheme={'brand'} 
                fontSize={13} 
                variant={variant ?? (active(path, startsWith) ? 'active' : 'outline')} 
                fontWeight={800} 
                borderRadius={'full'}
            >
                {children}
            </Button>
        </Link>
    );
}

function MobileNavButton({path, children, variant, startsWith}) {
    const location = useLocation();

    const active = (path) => {
        // console.log(location.pathname);
        if (path == location.pathname) {
            return true;
        } else if (startsWith) {
            const doesItStartWith = (location.pathname).startsWith(path);
            return doesItStartWith;
        } else {
            return false;
        }
    }

    return (
        <Link to={path} style={{
            marginTop: 0
        }}>
            <Button 
                width={'100%'}
                colorScheme={'brand'} 
                fontSize={13} 
                variant={variant ?? (active(path, startsWith) ? 'mobile-active' : 'mobile-outline')} 
                fontWeight={800} 
                borderRadius={0}
                border={0}
                justifyContent="flex-start"
                px={6}
                py={6}
            >
                
                {children}
                
            </Button>
        </Link>
    );
}

function DesktopNavItems() {
    return (
        <Fragment>
        {navitems.map((a, i) => (
            <DesktopNavButton 
                key={i}
                path={a?.path}
                startsWith={a?.beginWith}
            >
                {a?.title}
            </DesktopNavButton>
        ))}
        </Fragment>
    );
}

function MobileNavItems() {
    return (
        <Fragment>
        {navitems.map((a, i) => (
            <MobileNavButton
                key={i} 
                path={a?.path} 
                startsWith={a?.beginWith}
            >
                {a?.title}
            </MobileNavButton>
        ))}
        </Fragment>
    );
}

function Navigation({onClockTicking}) {
    const [isMobileNavOpen, setMobileNav] = React.useState(false);
    
    const toggleMobileNav = () => {
        setMobileNav(isMobileNavOpen ? false : true);
    }
    
    return (
        <Fragment>
            {/** Philippine Standard Time - Desktop */}
            <Box
                bgColor={'brand.200'}
                width={'100%'}
                display={['none', 'none', 'none', 'block']}
            >
                <Container
                    maxWidth={'1200px'}
                    py={2}
                    height={'100%'}
                    
                >
                    <Text color={'white'} fontSize={13} display={'inline'}>Philippine Standard Time - </Text>
                    <Text color={'white'} fontSize={13} display={'inline'}><Clock format={'dddd, MMMM D, YYYY'} timezone={'Asia/Manila'} /></Text>
                    <Text color={'white'} fontSize={13} display={'inline'} ml={1.5}><Clock format={'h:mm:ss A'} timezone={'Asia/Manila'} ticking={true} /></Text>
                </Container>
                
            </Box>
            {/** Philippine Standard Time - Mobile and Tables */}
            <Box
                bgColor={'white'}
                width={'100%'}
                display={['block', 'block', 'block', 'none']}
                borderBottom={'1px solid'}
                borderColor={'gray.200'}
            >
                <Container
                    maxWidth={'100%'}
                    py={2}
                    height={'100%'}
                    alignItems={'end'}
                >
                    <Text color={'gray.500'} fontSize={[10, 11]} display={'inline'}><Clock format={'dddd, MMMM D, YYYY'} timezone={'Asia/Manila'} /></Text>
                    <Text color={'gray.500'} fontSize={[10, 11]} display={'inline'} ml={1}><Clock format={'h:mm:ss A'} timezone={'Asia/Manila'} ticking={true} /></Text>
                    <Text color={'gray.500'} fontSize={[10, 11]} display={'inline'} ml={1}>(Philippine Standard Time)</Text>
                </Container>
                
            </Box>
            <Box 
                bgColor={'white'}
                height={'70px'}
                borderBottom={'1px solid'}
                borderColor={'gray.200'}
                boxShadow={'sm'}
                padding={0}
            >
                <Container
                    maxWidth={'1200px'}
                    padding={'0px auto'}
                    height={'100%'}
                >
                    <Grid 
                        templateColumns={'repeat(12, 1fr)'} 
                        width={'100%'} 
                        height={'100%'}
                        gap={2}
                        alignItems={'center'}
                    >
                        {/** Desktop */}
                        <GridItem 
                            colSpan={[0, 0, 0, 6]}
                            display={['none', 'none', 'none', 'flex']}
                        >
                            
                            <Stack
                                direction='row'
                            >
                                <Image src={ecs_logo} width={'auto'} height={'40px'} />
                                
                                <Box px={3}>
                                    <Box width={'1px'} minHeight={'100%'} bg={'gray.300'} />
                                </Box>
                                
                                <DesktopNavItems />
                                
                            </Stack>
                            
                        </GridItem>
                        <GridItem 
                            colSpan={[0, 0, 0, 6]}
                            display={['none', 'none', 'none', 'block']}
                        >
                            <Stack
                                shouldWrapChildren={true}
                                direction='row'
                                justify={'end'}
                            >
                                <PopoverAccountNav />
                            </Stack>
                        </GridItem>

                        {/** Mobile and Tablets */}
                        <GridItem 
                            colSpan={[4, 4, 4, 0]}
                            display={['flex', 'flex', 'flex', 'none']}
                        >
                            
                            <Stack
                                direction='row'
                            >
                                <CustomIconButton 
                                    icon={<BiMenu size={'25px'} />} 
                                    text={'Menu'} 
                                    onClick={() => {
                                        toggleMobileNav();
                                    }}
                                />
                            </Stack>
                            
                        </GridItem>
                        <GridItem 
                            colSpan={[4, 4, 4, 0]}
                            display={['flex', 'flex', 'flex', 'none']}
                            
                        >
                            <Center width={'100%'}>
                                <Image src={ecs_logo} width={'auto'} height={['30px', '35px', '40px']} />
                            </Center>
                        </GridItem>
                        <GridItem 
                            colSpan={[4, 4, 4, 0]}
                            display={['block', 'block', 'block', 'none']}
                        >
                            
                            <Stack
                                direction='row'
                                justify={'end'}
                            >
                                
                                <PopoverAccountNav />
                                
                            </Stack>
                            
                        </GridItem>
                    </Grid>
                </Container>
            </Box>
            <Collapse 
                in={isMobileNavOpen}
                animateOpacity
                
            >
                <Box
                    bgColor={'white'}
                    display={['block', 'block', 'block', 'none']}
                    borderBottom={'1px solid'}
                    borderColor={'gray.200'}
                    boxShadow={'sm'}
                >
                    <Stack direction={'column'}>
                        <MobileNavItems />
                    </Stack>
                    
                </Box>
            </Collapse>
        </Fragment>
    );
}

export { Navigation }