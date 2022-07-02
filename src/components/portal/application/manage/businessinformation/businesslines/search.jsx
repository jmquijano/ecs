import { 
    InputGroup, 
    InputRightElement, 
    Stack, 
    Text 
} from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import { useRef, useState } from "react";
import { fetchPSIC, fetchPSICById } from "../../../../../../utils/fetch/basedata";
import { Loader } from "../../../../../loaders";


export default function Search(props) {
    const _ref = useRef();

    const [loading, setLoading] = useState({
        field: {
            psic_search: false,
            psic_onChange: false
        }
    });
    const [searchKeywordPSIC, setKeywordSearchPSIC] = useState('');
    const [searchOptionPSIC, setSearchOptionPSIC] = useState([]);
    const handleChangePSICKeyword = (e) => {
        e = e?.target?.value ?? "";
        setKeywordSearchPSIC(e);
    }

    const handleSearchPSIC = (e) => {
        e = e?.target?.value ?? '';

        fetchPSIC(
            e => setLoading({
                ...loading,
                field: {
                    ...loading?.field,
                    psic_search: true,
                    psic_onChange: true
                }
            }),
            e,
            5
        )
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setSearchOptionPSIC(res?.data);
                }
            })
            .finally(
                e => setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        psic_search: false,
                        psic_onChange: false
                    }
                })
            )
    }


    const handleChangePSIC = (e) => {
        e = parseInt(e) ?? null;
        
        if (e >= 1) {
            fetchPSICById(
                x => setLoading({
                    ...loading,
                    field: {
                        ...loading?.field,
                        psic_search: true
                    }
                }),
                e
            )
                .then(res => res.json())
                .then(res => {
                    if (res?.success) {
                        _ref?.current?.resetItems(true);
                        props?.onChange(res?.data);
                    }
                })
                .finally( 
                    x => {
                        setLoading({
                            ...loading,
                            field: {
                                ...loading?.field,
                                psic_search: false
                            }
                        });
                    }
                )
        }
    }

    return (
        <AutoComplete
            ref={_ref}
            onChange={handleChangePSIC}
        >
            <Stack direction='row'>
                <InputGroup>
                    <AutoCompleteInput
                        autoComplete="no"
                        fontSize={12}
                        onChangeCapture={handleSearchPSIC}
                        placeholder={'Search keywords can be PSIC class or industry description.'}
                    />
                    {
                        loading?.field?.psic_search ?
                        <InputRightElement children={<Loader.Default size={'md'} thickness={'3px'} />} />
                        :
                        ''
                    }
                </InputGroup>
                
            </Stack>
            <AutoCompleteList mt={1}>
                {
                    searchOptionPSIC?.map((d, i) => (
                        <AutoCompleteItem
                            key={d?.id}
                            value={String(d?.id)}
                            label={d?.psic_industry_description}
                            fontSize={13}
                            textAlign={'left'}
                        >
                            <Stack direction={'row'}>
                                <Text>
                                    {d?.psic_industry_description}
                                </Text>
                            </Stack>
                            
                        </AutoCompleteItem>
                    ))
                }
            </AutoCompleteList>
        </AutoComplete>
    )
}