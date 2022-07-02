import { 
    FormControl, 
    FormErrorMessage, 
    FormLabel, 
    InputGroup, 
    InputRightElement, 
    Stack 
} from "@chakra-ui/react";
import { 
    AutoComplete, 
    AutoCompleteInput, 
    AutoCompleteItem, 
    AutoCompleteList, 
    AutoCompleteTag,
    useAutoCompleteContext
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../../../../../loaders";

/**
 * Dropdown
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
 *      autoComplete: { 
 *          onChange: any,
 *          data: Array 
 *      },
 *      loading: boolean
 * }} props 
 * @returns 
 */
export default function Dropdown (props) {
    const { formControl, autoComplete, formLabel, loading } = props;

    const [inputProp, setInputProp] = useState();

    useEffect(() => {
        if (autoComplete?.selected?.name !== undefined && autoComplete?.selected?.name !== null) {
            setInputProp({
                value: autoComplete?.selected?.name,
            });
        } else {
            setInputProp(null);
        }
    }, [autoComplete?.selected]);

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
            <AutoComplete 
                openOnFocus 
                onChange={autoComplete?.onChange}                
            >
                <Stack direction={'row'}>
                    <InputGroup>
                        <AutoCompleteInput
                            fontSize={12}
                            disabled={
                                autoComplete?.data?.length <= 0 ? true : false
                            }
                            cursor={
                                autoComplete?.data?.length <= 0 ? 'progress' : 'pointer'
                            }
                            variant={autoComplete?.data?.length <= 0 ? 'filled' : 'outline'}
                            placeholder={autoComplete?.selected?.name}
                            {...inputProp}
                        />
                        
                        {
                            loading ?
                            <InputRightElement children={<Loader.Default size={'md'} thickness={'3px'} />} />
                            :
                            ''
                        }
                    </InputGroup>
                </Stack>
                
                <AutoCompleteList
                    mt={1}
                >
                    {
                        autoComplete?.data?.map((d, i) => {
                            return (<AutoCompleteItem
                                key={d?.id}
                                value={String(d?.id)}
                                label={d?.name}
                                fontSize={13}
                            >
                                {d?.name}
                            </AutoCompleteItem>
                            );
                        })
                    }
                </AutoCompleteList>
            </AutoComplete>
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