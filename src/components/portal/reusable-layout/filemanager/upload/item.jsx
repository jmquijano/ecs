import { Box, Select, Stack, Text, Progress } from "@chakra-ui/react"
import { useEffect } from "react"
import { FileIcon, defaultStyles } from "react-file-icon"
import UIButton from "../../button/UIButton"

export default function Item(props) {
    useEffect(() => {
    }, [props]);

    return (
        <Box
            border={'1px solid'}
            borderColor={'gray.200'}
            p={0}
            borderRadius={8}
            m={0}
            as={'div'}
        >
            {props?.progress?.percentage >= 1
            ?
            <Progress 
                value={props?.progress?.percentage} 
                size='xs' 
                colorScheme='brand' 
                borderTopRadius={8}
                sx={{
                    "& > div:first-child": {
                        transitionProperty: "width",
                    },
                }}
            />
            :
            ''}
            
            <Box p={4}>
                <Stack direction={'row'} mb={3}>
                    <Stack direction={'column'} alignItems={'center'}>
                        <Box
                            width={'50px'}
                            height={'auto'}
                        >
                            <FileIcon extension={props?.extension} {...defaultStyles[props?.extension]} />
                        </Box>
                    </Stack>
                    <Stack direction={'column'} width={'100%'}>
                        <Text fontSize={13}>{props?.name ?? props?.file?.name}</Text>
                        <Select 
                            name="doctype" 
                            fontSize={13}
                            width={'100%'}
                            onChange={e => props?.onDocTypeChange(props?.index, e)}
                        >
                            <option value="">Select Document Type</option>
                            {
                                props?.docTypeSelector instanceof Object ?
                                props?.docTypeSelector?.map((d, i) => (
                                    <option value={d?.id}>{d?.fullname}</option>
                                ))
                                :
                                ''
                            }
                        </Select>
                        
                    </Stack>
                </Stack>
            </Box>
            
            <UIButton
                colorScheme={'red'}
                fontSize={12}
                py={1}
                width={'100%'}
                borderTopRadius={0}
                borderBottomRadius={8}
                variant={'active'}
                mx={0}
                px={0}
                onClick={e => props?.onRemove(props?.index)}
                disabled={props?.progress?.percentage >= 1 ? true : false}
            >
                Remove
            </UIButton>
        </Box>
    )
}