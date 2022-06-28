import { Box, Center, Text, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { BiCheck, BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { editApplicationById } from "../../../../../utils/fetch/application";
import { PageBaseUrl, PageRouteWithParam } from "../../../../../utils/urlbase";
import { Loader } from "../../../../loaders";
import UIButton from "../../../reusable-layout/button/UIButton";


export default function Submit(props) {
    const { id, applicationData } = props;
    const { status } = applicationData;

    // loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status?.shortname === "DRAFT") {
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
        } else {
            setLoading(false);
        }
    }, [status]);

    return (
        <Center minHeight={'40vh'} flexDirection={'column'} gap={3} py={0}>
        {
            loading ?
            <Loader.Default size={'xl'} thickness={'5px'} />
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