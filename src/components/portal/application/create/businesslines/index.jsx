import { Grid, GridItem } from "@chakra-ui/react"
import { Field } from "formik"
import { Fragment } from "react"
import SectionTitle from "../sectiontitle"
import PSICSearch from "./search"
import BusinessLineTable from "./table"

export default function BusinessLines(props) {

    return (
        <Fragment>
            <SectionTitle title={'Business Lines'} />
            <GridItem colSpan={12}>
                <Grid
                    templateColumns={'repeat(12, 1fr)'} 
                    width={'100%'} 
                >
                    <GridItem colSpan={[12, 12, 12, 12, 12]}>
                        <PSICSearch onChange={props?.search?.onChange} />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 12, 12]}>
                        <Field>
                            {({form}) => (
                                <BusinessLineTable 
                                    onRemove={props?.table?.onRemove}
                                    data={props?.table?.data} 
                                    errorMessage={form?.errors?.businessline}
                                />
                            )}
                            
                        </Field>
                        
                    </GridItem>
                </Grid>
                
                
            </GridItem>
        </Fragment>
        
    )
}