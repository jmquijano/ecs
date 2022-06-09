import { Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * 
 * @param {{ 
 *      to: string, 
 *      icon: component,
 *      text: string
 * }} props 
 * @returns 
 */
export default function PageLinkButton(props) {
    const { to, text, icon } = props;

    useEffect(() => {
        console.log(props);
    }, [props]);

    return (
        <Link to={to ?? '/'} style={{
            width: '100%',
            textAlign: 'right'
        }}>
            <Button 
                width={['100%', '100%', 'auto', 'auto']}
                my={[3, 0, 0, 0]}
                colorScheme={'brand.200'} 
                variant={'outline'}
                fontSize={13}
                px={4}
                py={2}
                borderRadius={'full'}
                fontWeight={600}
            >
                {icon ?? ''}
                <Text ml={0}>
                    {text}
                </Text>
            </Button>
        </Link>
    );
    
}