import { Fragment } from "react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Field } from "formik"
import Search from "./search"
import BusinessLineTable from "./table"

export default function BusinessLines(props) {
    return (
        <Fragment>
            <Grid
                templateColumns={'repeat(12, 1fr)'} 
                width={'100%'} 
                gap={0}
            >
                <GridItem colSpan={[12, 12, 12, 12, 12]}>
                    <Search onChange={props?.search?.onChange} />
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
        </Fragment>
    )
}