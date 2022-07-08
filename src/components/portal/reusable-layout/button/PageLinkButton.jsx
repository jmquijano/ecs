import { 
    Button, 
    Text, 
    Box 
} from "@chakra-ui/react";
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
    const { to, text, icon, width, variant } = props;

    useEffect(() => {
        // console.log(props);
    }, [props]);

    return (
        <Box 
            width={width}
            my={0}
        >
            <Link 
                to={to ?? '/'} 
                style={{
                    width: 'auto',
                    textAlign: 'right'
                }}
            >
                <Button 
                    width={['100%', '100%', 'auto', 'auto']}
                    my={[1, 0, 0, 0]}
                    colorScheme={'brand.200'} 
                    fontSize={13}
                    px={4}
                    py={2}
                    borderRadius={'full'}
                    fontWeight={600}
                    variant={variant ?? 'outline'}
                >
                    {icon ?? ''}
                    <Text ml={0}>
                        {text}
                    </Text>
                </Button>
            </Link>
        </Box>
        
    );
    
}