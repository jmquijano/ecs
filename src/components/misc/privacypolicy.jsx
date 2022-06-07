import { Heading, Text, Stack, Spacer, Box, List, UnorderedList, ListItem, OrderedList} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { goExternalLink } from "./externallink"

const DPPStatement = (props) => {
    return (
        <Box {...props?.container}>
                <Text fontSize={'sm'}>
                    This Privacy Policy applies only to BFP-ECS and is 
                    valid for applicants of the system with regards to the information that 
                    they shared and/or collected in BFP-ECS. 
                    
                    This policy is not applicable to any information collected offline (via F2F filing) or 
                    via channels other than this system.
                </Text>

                <Box py={4}>
                    <Text fontSize='2xl'>Consent</Text>
                    <Text fontSize={'sm'}>
                        By using this system, you hereby consent to our Data Privacy Policy and agree to its terms.
                    </Text>
                </Box>

                <Box py={4}>
                    <Text fontSize='2xl'>What We Collect</Text>
                    <Text fontSize={'sm'}>
                        The information that you are asked to provide are the required information for the FSIC application, 
                        such as but not limited to the following:
                    </Text>
                    <Box pl={5}>
                        <OrderedList>
                            <ListItem>
                                <Text fontSize={'sm'}>
                                    Primary Information
                                </Text>
                                <UnorderedList>
                                    <ListItem>
                                        <Text fontSize={'sm'} display={'inline'}>
                                            Ownership Type - This refers to the ownership structure of the business, it can be classified as Individual, Corporate, Partnership or Cooperative.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'} display={'inline'}>
                                            Business ID - This refers to the Business ID number issued by the BPLO division of your LGU.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'} display={'inline'}>
                                            Name of Taxpayer - For individual/sole proprietorship this refers to the full name of the taxpayer, for corporate, partnership and cooperative this refers to the "Corporate Name", "Partnership Name", and "Cooperative Name" registered to SEC and CDA (if applicable).
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'} display={'inline'}>
                                            Date of Birth - For individual/sole proprietorship this refers to the birth date of the taxpayer. For corporate, partnership and cooperative this refers to the "Date of Incorporation" or "Date of Registration" to SEC and CDA (if applicable).
                                        </Text>
                                    </ListItem>
                                </UnorderedList>
                            </ListItem>
                            <ListItem>
                                <Text fontSize={'sm'}>
                                    Business Lines / Activities
                                </Text>
                                <Text fontSize={'sm'}>
                                    We will be asking you to provide activities within your business. These activities are based on Philippine Standard Industrial Code (PSIC) version 2009.
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text fontSize={'sm'}>
                                    Business Address
                                </Text>
                                <Text fontSize={'sm'}>
                                    We need you to provide the "Province", "City or Municipality", "Barangay" and "Street" of which your business is located at.
                                    By "pinning" the location on the map, we will be collecting the longitude and latitude of your business establishment. 
                                    "Room / Door", "Building / Subdivision", and "Landmark" are optional.
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text fontSize={'sm'}>
                                    Other Information
                                </Text>
                                <UnorderedList>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            DTI Trade Name (if applicable)
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for individual / sole proprietor.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            DTI Registration Number (if applicable)
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for individual / sole proprietor.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            DTI Registration Date (if applicable)
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This refers to when your certificate was issued by DTI. 
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for individual / sole proprietor.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            SEC Registered Name (if applicable)
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for corporate, partnership and cooperative.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            SEC Registration No. (if applicable)
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for corporate, partnership and cooperative.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            CDA Registered Name (if applicable)
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for cooperative.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            CDA Registration Number (if applicable)
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for cooperative.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            BIR Tax Identification Number
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for all applicants.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text fontSize={'sm'}>
                                            BIR Revenue District Office Code
                                        </Text>
                                        <Text fontSize={'sm'}>
                                           This is optional for all applicants.
                                        </Text>
                                    </ListItem>
                                </UnorderedList>
                            </ListItem>
                        </OrderedList>
                        
                    </Box>
                </Box>
                
                <Box py={4}>
                    <Text fontSize='2xl'>How Do We Use</Text>
                    <Text fontSize={'sm'}>
                        The use of information we collect may vary, including (but not limited):
                    </Text>
                    <OrderedList pl={5}>
                        <ListItem>
                            <Text fontSize={'sm'}>
                                For processing of transaction
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize={'sm'}>
                                Client profiling
                            </Text>
                        </ListItem>
                    </OrderedList>
                </Box>

                <Box py={4}>
                    <Text fontSize='2xl'>Cookies</Text>
                    <Text fontSize={'sm'}>
                        Cookies are used by the web browser to store information.
                        These cookies then can be sent back to the server each time your browser requests a new page. 
                        It's a way for a website to remember you, and your preferences.
                    </Text>
                    <Text fontSize={'sm'} mt={3}>
                        "BFP-ECS" did not use cookies to record session information. We make use of tokens stored within the browser's localStorage to identify your session with us and is only sent when required.
                    </Text>
                    <Text fontSize={'sm'} mt={3}>
                        However, we may use certain services from third-party that may use cookies. For further details of the cookies that may be present within this system, 
                        please click <Text display={'inline'} cursor={'pointer'} color={'brand.200'} fontWeight={600}>here</Text>.
                    </Text>
                    <Text fontSize={'sm'} mt={3}>
                        Cookie settings can be set or configured through your browser settings.
                        However, in such a case you will most probably not be able to make use of some of the functions on the system.
                    </Text>
                    
                </Box>

                <Box py={4}>
                    <Text fontSize='2xl'>Storage and Security</Text>
                    <Text fontSize={'sm'}>
                        Conventional security measures are implemented to protect the information which are provided and stored to the system.
                        These measures comprise secured servers, encryption, and firewalls. 
                        Communication between client (you) and the server are transported via Secured Socket Layer (SSL) protocol.
                    </Text>
                    <Text fontSize={'sm'} mt={3}> 
                        Uploaded files are stored in a third party secured storage platform (Backblaze) which will require additional token in order to access the file thus "open to the public access" of these files are naturally restricted.
                        File access are granted to limited users only.
                    </Text>
                    <Text fontSize={'sm'} mt={3}> 
                        To know more about Backblaze's privacy policy, <Text cursor={'pointer'} color={'brand.200'} display='inline'><Link target='_blank' to={goExternalLink('https://www.backblaze.com/company/privacy.html')}>read here</Link></Text>.
                    </Text>
                </Box>

                <Box py={4}>
                    <Text fontSize='2xl'>Data Retention</Text>
                    <Text fontSize={'sm'}>
                    The data provided shall be retained for as long as necessary to fulfill the purpose for which it was collected.
                    </Text>
                    
                </Box>
                
            
        </Box>
    )
}

export { DPPStatement }