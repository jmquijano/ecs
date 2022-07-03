import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import tinFormat from "../../../../../misc/tinformat";
import ZeroPadding from "../../../../../misc/zeropadding";

/**
 * Tin Group Input Field
 * @param {{ 
 *      formControl: { 
 *          isInvalid: any, 
 *          isRequired: boolean,
 *          label: {
 *              text: string,
 *              htmlFor: string
 *          },
 *          errorMessage: any
 *      },
 *      tin1: {
 *          onChange: function
 *      },
 *      tin2: {
 *          onChange: function
 *      },
 *      tin3: {
 *          onChange: function
 *      }
 *      tin4: {
 *          onChange: function
 *      },
 *      formik: Array
 * }} props 
 * @returns 
 */
export default function TinGroupField(props) {
    const {formControl, tin1, tin2, tin3, tin4, tin, branch_code} = props;

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
            <Stack direction={'row'}>
                <Input
                    name={'other.tin1'}
                    fontSize={13}
                    maxLength={3}
                    placeholder={'000'}
                    onChange={tin1?.onChange}
                    value={tinFormat(tin, 0)}
                />
                <Input
                    name={'other.tin2'}
                    fontSize={13}
                    maxLength={3}
                    placeholder={'000'}
                    onChange={tin2?.onChange}
                    value={tinFormat(tin, 1)}
                />
                <Input
                    name={'other.tin3'}
                    fontSize={13}
                    maxLength={3}
                    placeholder={'000'}
                    onChange={tin3?.onChange}
                    value={tinFormat(tin, 2)}
                />
                <Input
                    name={'other.branch_code'}
                    fontSize={13}
                    maxLength={5}
                    placeholder={'00000'}
                    onChange={tin4?.onChange}
                    value={ZeroPadding(branch_code)}
                />
            </Stack>
            
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