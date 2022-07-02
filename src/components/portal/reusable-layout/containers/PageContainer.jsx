import { Box, Container, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageLinkButton from "../button/PageLinkButton";

/**
 * 
 * @param {{ 
 *      title: string, 
 *      heading: {
 *          title: string,
 *          menu: {
 *              link: string,
 *              icon: any,
 *              text: string
 *          }
 *      }, 
 *      children: any 
 * }} props 
 * @returns 
 */
export default function PageContainer(props) {
    const { title, heading, children, boxProps } = props;

    useEffect(() => {
    }, [props]);

    return (
        <Fragment>
            <Helmet>
                <title>{title ?? heading?.title}</title>
            </Helmet>
            <Container 
                maxWidth={'1200px'}
                py={[5, 5, 5, 5, 10]}
            >
                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={[2, 5, 10, 10]}>
                    <GridItem 
                        colSpan={[12, 12, 6, 6, 6]} 
                        maxWidth={'100%'}
                    >
                        <Heading 
                            color={'brand.300'}
                            fontSize={['150%']}
                            cursor={'pointer'}
                        >
                            {heading?.title ?? title}
                        </Heading>
                        {heading?.leftAdornment}
                    </GridItem>
                    <GridItem 
                        colSpan={[12, 12, 6, 6, 6]} 
                        maxWidth={'100%'}
                    >
                        <Stack 
                            direction={'row'}
                            justify={'end'}
                        >
                            {
                                heading?.menu instanceof Object ?
                                heading?.menu?.map((d) => (
                                    <PageLinkButton 
                                        to={d?.to}
                                        icon={d?.icon}
                                        text={d?.text}
                                    />
                                ))
                                :
                                ''
                            }
                            
                        </Stack>
                        {heading?.rightAdornment}
                    </GridItem>
                </Grid>
                <Box
                    bg={'white'}
                    width={'100%'}
                    borderRadius={boxProps?.borderRadius ?? 10}
                    border={boxProps?.border ?? '1px solid'}
                    borderColor={'gray.100'}
                    mt={boxProps?.mt ?? 5}
                    overflowX={boxProps?.overflowX ?? 'auto'}
                    {...boxProps}
                >
                    {children}
                </Box>
                
            </Container>
        </Fragment>
    )
}