import { Box, Stack, Text } from "@chakra-ui/react";

export default function Footer(props) {
    const { fileCount } = props;

    const countText = (c) => {
        if (c >= 2) {
            return c + " files uploaded";
        } else if (c <= 0) {
            return "No file uploaded";
        }
        else {
            return c + " file uploaded";
        }
    }

    return (
        <Stack
            direction={['column', 'column', 'row', 'row']}
            alignItems={'center'}
            borderTop={'1px solid'}
            borderTopColor={'gray.200'}
            py={3}
            px={10}
        >
            <Box
                fontWeight={'800'}
                width={'auto'}
            >
                <Text 
                    display={'block'} 
                    color={'gray.600'} 
                    fontSize={12}
                >
                    {countText(fileCount ?? 0)}
                </Text>
            </Box>
        </Stack>
    )
}