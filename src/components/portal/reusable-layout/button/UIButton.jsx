import { Button } from "@chakra-ui/react"

export default function UIButton(props) {
    return (
        <Button 
                width={['100%', '100%', 'auto', 'auto']}
                my={[3, 0, 0, 0]}
                colorScheme={props?.colorScheme ?? 'brand.200'} 
                variant={props?.variant ?? 'outline'}
                fontSize={13}
                px={4}
                py={2}
                borderRadius={'full'}
                fontWeight={600}
                {...props}
            >
            {props?.children}
        </Button>
    )
}