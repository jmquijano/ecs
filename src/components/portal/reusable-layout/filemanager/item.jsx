import { Box, Stack, Text } from "@chakra-ui/react"
import UIButton from "../button/UIButton"
import { FileIcon, defaultStyles } from "react-file-icon";
import moment from "moment";
import { Loader } from "../../../loaders";

/**
 * Bytes to File Size
 * @param bytes 
 * @param decimals 
 * @returns 
 */
function bytesToFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function Item(props) {
    let { id, name, path, size, checksum, extension } = props;

    return (
        <Box
            borderBottom={'1px solid'}
            borderBottomColor={'gray.200'}
            py={5}
            px={10}
        >
            <Stack 
                direction={['column', 'column', 'row', 'row']}
                alignItems={'center'}
            >
                <Box width={'50px'} height={'auto'} alignItems={'center'}>
                    <FileIcon extension={props?.extension} {...defaultStyles[props.extension]} />
                </Box>
                <Box 
                    ps={5} 
                    width={'100%'}
                    textAlign={['center', 'center', 'left', 'left']}
                >
                    <Text
                        display={'block'}
                        color={'gray.700'}
                        fontSize={15}
                    >
                        {props?.name}
                    </Text>
                    <Text display={'inline'} color={'gray.500'} fontSize={12}>
                        {bytesToFileSize(size ?? 0)} - Uploaded {(new Date(props?.created_at))?.toLocaleString(props?.locale)}
                    </Text>
                    
                </Box>
                <Stack direction={'row'}>
                    <Box>
                        <UIButton
                            variant={'active'}
                            onClick={(e) => props?.onOpen(props)}
                        >
                            <Text>Open</Text>
                        </UIButton>
                    </Box>
                    <Box>
                        <UIButton  
                            onClick={(e) => props?.onRemove(props)} 
                            disabled={props?.isRemoving}
                        >
                            {props?.isRemoving ? 
                                <Loader.Default size={'sm'} mr={2} />
                                : 
                                ''
                            }
                            <Text>Remove</Text>
                        </UIButton>
                    </Box>
                </Stack>
                
                
                
            </Stack>
        </Box>
    )
}