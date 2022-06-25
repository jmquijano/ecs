import { Button } from "@chakra-ui/react"

export default function UIButton(props) {
    return (
        <Button 
            width={['100%', '100%', 'auto', 'auto']}
            my={props?.my}
            colorScheme={props?.colorScheme ?? 'brand.200'} 
            variant={props?.variant ?? 'outline'}
            fontSize={13}
            px={props?.px ?? 4}
            py={props?.py ?? 2}
            borderRadius={'full'}
            fontWeight={600}
            {...props}
        >
            {props?.children}
        </Button>
    )
}