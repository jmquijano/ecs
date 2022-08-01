import { 
    Box, 
    Stack, 
    Text, 
    Container, 
    Grid, 
    GridItem 
} from "@chakra-ui/react";
import { useState } from "react";
import { Fragment } from "react";
import { BiPlus } from "react-icons/bi";
import UIButton from "../../../reusable-layout/button/UIButton";
import Add from "./add";

export default function Equipments(props) {
    const [showAdd, setShowAdd] = useState(false);

    const toggleShowAdd = () => {
        // toggle showAdd
        setShowAdd(!showAdd ? true : false);
    }

    return (
        <Fragment>
            <Add 
                isOpen={showAdd}
                onClose={toggleShowAdd}
            />
            <Container
                maxWidth={'100%'}
                py={0}
                px={0}
                minHeight={'auto'}
            >
                <Grid
                    templateColumns={'repeat(12, 1fr)'} 
                    width={'100%'} 
                    gap={0}
                    marginTop={'0px !important'}
                >
                    <GridItem
                        colSpan={[12, 12, 12, 12]}
                    >
                        <Stack
                            direction={['column', 'column', 'row', 'row']}
                            alignItems={'center'}
                            borderBottom={'1px solid'}
                            borderBottomColor={'gray.200'}
                            py={2}
                            px={10}
                        >
                            <Box
                                fontWeight={'800'}
                                width={'100%'}
                            >
                                <Text 
                                    color={'gray.600'}
                                    fontSize={15}
                                >
                                    Equipments
                                </Text>
                            </Box>

                            <Box >
                                <UIButton
                                    variant={'ghost'}
                                    onClick={toggleShowAdd}
                                >
                                    <BiPlus size={17} />
                                    <Text fontSize={13} ms={2}>
                                        Add Equipment
                                    </Text>
                                    
                                </UIButton>
                            </Box>
                        </Stack>
                    </GridItem>
                </Grid>
            </Container>
        </Fragment>
    )
}