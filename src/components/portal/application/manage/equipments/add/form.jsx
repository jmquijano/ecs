import { FormControl, FormLabel, Grid, GridItem, Select } from "@chakra-ui/react";
import { Field, Formik, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { Fragment } from "react";
import * as Yup from 'yup';

export default function Form(props) {
    // Formik Submit Handler
    const submitHandler = async (values, { setErrors, resetForm, errors }) => {
        
    }

    // Formik Initial Values
    const initialValues = {
        equipment: null,
        context: {
            acquisition_date: null,
            expiration_date: null,
            manufacturing_date: null,
            serial_number: null,
            manufacturer: null
        }
    }

    // Formik Validation Schema
    const validationSchema = Yup.object().shape({
        equipment: Yup.string().required("Equipment is required"),
        
    })


    useEffect(() => {
        
    }, []);

    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
            >
                <Grid
                    templateColumns={'repeat(12, 1fr)'} 
                    width={'100%'} 
                    gap={4}
                >
                    <GridItem colSpan={[12, 12, 12, 12]}>
                        <Field
                            name={'equipment'}
                        >
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.equipment && form.touched.equipment}
                                    isRequired
                                >
                                    <FormLabel 
                                        htmlFor={'equipment'}
                                        fontSize={12}
                                    >
                                        Equipment
                                    </FormLabel>
                                    <Select
                                        {...field}
                                        id={'equipment'}
                                        
                                        fontSize={13}
                                    >
                                        <option value={null}>Select equipment type</option>
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                    </GridItem>
                </Grid>
            </Formik>
        </Fragment>
    )
}