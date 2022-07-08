import { Box, Center, Text, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { editApplicationById } from "../../../../../utils/fetch/application";
import { PageBaseUrl, PageRouteWithParam } from "../../../../../utils/urlbase";
import { Loader } from "../../../../loaders";
import UIButton from "../../../reusable-layout/button/UIButton";

import { MdWarningAmber } from "react-icons/md";

export default function Submit(props) {
    const { id, applicationData } = props;
    const { status } = applicationData;

    // search params
    const [searchParams] = useSearchParams();

    // loading state
    const [loading, setLoading] = useState(true);

    // show prompt state
    const [showPrompt, setShowPrompt] = useState(true);

    const navigate = useNavigate();

    const handleChangeStatusToCreated = (e) => {
        editApplicationById(
            () => setLoading(true),
            id,
            {
                status: 'Created'
            }
        )
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setLoading(false);
            } else {
                alert(res?.message);
            }
        })
        .finally(e => setLoading(false));
    }

    const handleClickSubmitApplication = (e) => {
        editApplicationById(
            () => setLoading(true),
            id,
            {
                status: 'Created'
            }
        )
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setShowPrompt(false);
                setLoading(false);
            } else {
                alert(res?.message);
            }
        })
        .finally(e => setLoading(false));
    }

    useEffect(() => {
        let prompt = searchParams.get("prompt") ?? false;

        if (prompt) {
            setShowPrompt(true);
            setLoading(false);
        } else {
            if (status?.shortname === "DRAFT") {
                handleChangeStatusToCreated();
            } else {
                setLoading(false);
                navigate(
                    PageRouteWithParam(
                        {
                            'id': id
                        },
                        PageBaseUrl?.Application.Manage?.Index
                    )
                )
            }
        }
        
    }, [status]);

    return (
        <Center 
            minHeight={'40vh'} 
            flexDirection={'column'} 
            gap={3} 
            py={0}
        >
        
        {
            loading ?
            <Loader.Default size={'xl'} thickness={'5px'} />
            :
            showPrompt ?
            <>
                <Text 
                    fontSize={['80%', '90%', '100%']}
                >
                    You are about to submit this application.
                </Text>
                
                <Stack direction={['row']}>
                    <Link to={PageRouteWithParam({'id': props?.id}, PageBaseUrl?.Application.Manage.Index)}>
                        <UIButton mt={0} variant={'outline'}>
                            Edit/View as Draft
                        </UIButton>
                    </Link>
                    <UIButton
                        variant={'active'}
                        onClick={handleClickSubmitApplication}
                    >
                        Submit Application
                    </UIButton>
                </Stack>
                <Box maxWidth={400} my={1}>
                    <Text 
                        fontSize={[9, 10, 11]}
                        textAlign={'center'}
                    >
                        By clicking the "Submit Application" button you have read, understood, <br />and agreed to our 
                        <Text 
                            color={'brand.200'} 
                            display={'inline'}
                            cursor={'pointer'}
                            ml={1}
                        >
                            Data Privacy Statement
                        </Text>
                        .
                    </Text>
                </Box>
                
                
                
            </>
            :
            <>
                <Text color={'green.300'}>
                    <BiCheckCircle fontSize={'6em'} />
                </Text>
                <Text fontSize={15}>
                    Your application has been successfully created.
                </Text>
                <Stack direction={'row'}>
                    
                    <Link to={PageBaseUrl.Application.Index}>
                        <UIButton variant={'ghost'}>
                            Return to My Application
                        </UIButton>
                    </Link>

                    <Link to={PageRouteWithParam({'id': props?.id}, PageBaseUrl?.Application.Manage.Index)}>
                        <UIButton mt={0} variant={'active'}>
                            View/Edit this Application
                        </UIButton>
                    </Link>
                    
                </Stack>
            </>
        }
            
            
            
            
        </Center>
    )
}