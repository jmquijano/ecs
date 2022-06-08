import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";

/**
 * Input Field
 * @param {{ 
 *      formControl: { 
 *          isInvalid: any, 
 *          isRequired: boolean,
 *          label: {
 *              text: string,
 *              htmlFor: string
 *          },
 *          input: {
 *              id: string,
 *              placeholder: string
 *          }
 *          errorMessage: any
 *      },
 *          
 * }} props 
 * @returns 
 */
export default function InputField(props) {
    const { formControl  } = props;    
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
            <Input 
                {...formControl?.input?.field} 
                id={formControl?.input?.id}
                placeholder={formControl?.input?.placeholder}
                fontSize={13}
            />
            <FormErrorMessage 
                textAlign={'left'}
                fontSize={12}
            >
                {
                    formControl?.errorMessage instanceof Map ? formControl?.errorMessage.map((d, i) => {
                        return d;
                    }) : formControl?.errorMessage
                }
            </FormErrorMessage>
        </FormControl>
    )
}