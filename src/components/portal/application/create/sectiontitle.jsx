import { Box, GridItem, Text } from "@chakra-ui/react"

/**
 * Section Title
 * @param {{ title: string }} props 
 * @returns 
 */
export default function SectionTitle(props) {
    return (
        <GridItem 
            colSpan={12} 
            mt={4}
        >
            <Box
                display={'block'}
                borderTop={'2px solid'}
                borderColor={'brand.200'}
                height={'auto'}
                textAlign={'left'}
            >
                <Text
                    as={'span'}
                    bg={'gray.200'} 
                    color={'brand.200'}
                    display={'inline-block'} 
                    mt={0} 
                    py={2}
                    px={5}
                    fontSize={13}
                    fontWeight={600}
                    borderBottomRadius={'8px'}
                >
                    {props?.title}
                </Text>
            </Box>
            
        </GridItem>
    )
}