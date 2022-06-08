import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";
import { Field } from "formik";

/**
 * Select Field
 * @param {{ 
 *      formControl: { 
 *          isInvalid: any, 
 *          isRequired: boolean,
 *          label: {
 *              text: string,
 *              htmlFor: string
 *          },
 *          select: {
 *              id: string
 *          }
 *          errorMessage: any
 *      },
 *      data: Array,
 *      formik: Array
 * }} props 
 * @returns 
 */
export default function SelectField(props) {
    const { data, onChange, formControl, select, errorMessage } = props;

    return (
        <FormControl 
            isInvalid={formControl?.isInvalid} 
            isRequired={formControl?.isRequired}
        >
            <FormLabel 
                htmlFor={formControl?.label?.htmlFor}
                fontSize={12}
            >
                {formControl?.label?.text}
            </FormLabel>
            <Select
                {...formControl?.select?.field}
                id={formControl?.select?.id}
                fontSize={13}
            >
                <option value=""></option>
                {
                    data.map((d, i) => (
                        <option value={d?.id}>{d?.code + " : " + d?.name}</option>
                    ))
                }
            </Select>
            <FormErrorMessage 
                textAlign={'left'}
                fontSize={12}
            >
                {
                    errorMessage
                }
            </FormErrorMessage>
        </FormControl>
    )
}