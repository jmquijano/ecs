{/* PSGC Province */}
{selectedBusinessType?.id >= 1 ?
    <GridItem colSpan={[12, 12, 4, 4]}>
        <Field 
            name='province'
        >
            {({ field, form }) => (
                <FormControl 
                    isInvalid={form.errors?.province && form.touched?.province} 
                    isRequired
                    
                >
                    <FormLabel 
                        htmlFor={'province'}
                        fontSize={12}
                    >
                        Province
                    </FormLabel>
                    <AutoComplete 
                        openOnFocus 
                        onChange={handleProvinceChange}
                    >
                        <Stack direction={'row'}>
                            <InputGroup>
                                <AutoCompleteInput
                                    autoComplete="no"
                                    fontSize={12}
                                    disabled={
                                        province.length <= 0 ? true : false
                                    }
                                    cursor={
                                        province.length <= 0 ? 'progress' : 'pointer'
                                    }
                                    variant={province.length <= 0 ? 'filled' : 'outline'}
                                />
                                {
                                    loading?.field?.province ?
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
                                province?.map((d, i) => {
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
                            form.errors?.province instanceof Map ? form.errors?.province.map((d, i) => {
                                return d;
                            }) : form?.errors?.province
                        }
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </GridItem>
    : ''
    }

    {/* PSGC City */}
    {selectedBusinessType?.id >= 1 ?
    <GridItem colSpan={[12, 12, 4, 4]}>
        <Field 
            name='city'
        >
            {({ field, form }) => (
                <FormControl 
                    isInvalid={form.errors?.city && form.touched?.city} 
                    isRequired
                    
                >
                    <FormLabel 
                        htmlFor={'city'}
                        fontSize={12}
                    >
                        City / Municipality
                    </FormLabel>
                    <AutoComplete 
                        openOnFocus 
                        onChange={handleCityChange}
                    >
                        <Stack direction={'row'}>
                            <InputGroup>
                                <AutoCompleteInput
                                    fontSize={12}
                                    disabled={
                                        city.length <= 0 ? true : false
                                    }
                                    cursor={
                                        city.length <= 0 ? 'progress' : 'pointer'
                                    }
                                    variant={city.length <= 0 ? 'filled' : 'outline'}
                                />
                                {
                                    loading?.field?.city ?
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
                                city?.map((d, i) => {
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
                            form.errors?.city instanceof Map ? form.errors?.city.map((d, i) => {
                                return d;
                            }) : form?.errors?.city
                        }
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </GridItem>
    : ''
    }

    {/* PSGC Barangay */}
    {selectedBusinessType?.id >= 1 ?
    <GridItem colSpan={[12, 12, 4, 4]}>
        <Field 
            name='barangay'
        >
            {({ field, form }) => (
                <FormControl 
                    isInvalid={form.errors?.barangay && form.touched?.barangay} 
                    isRequired
                    
                >
                    <FormLabel 
                        htmlFor={'barangay'}
                        fontSize={12}
                    >
                        Barangay
                    </FormLabel>
                    <AutoComplete 
                        openOnFocus 
                        onChange={handleBarangayChange}
                    >
                        <Stack direction={'row'}>
                            <InputGroup>
                                <AutoCompleteInput
                                    fontSize={12}
                                    disabled={
                                        barangay.length <= 0 ? true : false
                                    }
                                    cursor={
                                        barangay.length <= 0 ? 'progress' : 'pointer'
                                    }
                                    variant={barangay.length <= 0 ? 'filled' : 'outline'}
                                />
                                {
                                    loading?.field?.barangay ?
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
                                barangay?.map((d, i) => {
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
                            form.errors?.barangay instanceof Map ? form.errors?.barangay.map((d, i) => {
                                return d;
                            }) : form?.errors?.barangay
                        }
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </GridItem>
    : ''
    }

    {/* Room or Door */}
    {selectedBusinessType?.id >= 1 ?
    <GridItem colSpan={[12, 12, 4, 4]}>
        <Field 
            name='address.room'
        >
            {({ values, field, form }) => (
                <FormControl 
                    isInvalid={form.errors['address.room'] && form.touched?.address?.room}
                >
                    <FormLabel 
                        htmlFor={'address.room'}
                        fontSize={12}
                    >
                        Room / Door
                        
                    </FormLabel>
                    <Input 
                        {...field} 
                        autoComplete={'off'}
                        id='address.room' 
                        placeholder='' 
                        fontSize={13}
                        disabled={
                            form?.values?.barangay == null
                        }
                        variant={form?.values?.barangay == null ? 'filled' : 'outline'}
                        
                    />
                    <FormErrorMessage 
                        textAlign={'left'}
                        fontSize={12}
                    >
                        {
                            form.errors['address.room'] instanceof Map ? form.errors['address.room'].map((d, i) => {
                                return d;
                            }) : form?.errors['address.room']
                        }
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </GridItem>
    : ''
    }

    {/* Building */}
    {selectedBusinessType?.id >= 1 ?
    <GridItem colSpan={[12, 12, 4, 4]}>
        <Field 
            name='address.building'
        >
            {({ values, field, form }) => (
                <FormControl 
                    isInvalid={form.errors['address.building'] && form.touched?.address?.building}
                >
                    <FormLabel 
                        htmlFor={'address.building'}
                        fontSize={12}
                    >
                        Building
                        
                    </FormLabel>
                    <Input 
                        {...field} 
                        autoComplete={'off'}
                        id='address.room' 
                        placeholder='' 
                        fontSize={13}
                        disabled={
                            form?.values?.barangay == null
                        }
                        variant={form?.values?.barangay == null ? 'filled' : 'outline'}
                        
                    />
                    <FormErrorMessage 
                        textAlign={'left'}
                        fontSize={12}
                    >
                        {
                            form.errors['address.room'] instanceof Map ? form.errors['address.room'].map((d, i) => {
                                return d;
                            }) : form?.errors['address.room']
                        }
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </GridItem>
    : ''
    }

    {/* Street */}
    {selectedBusinessType?.id >= 1 ?
    <GridItem colSpan={[12, 12, 4, 4]}>
        <Field 
            name='address.street'
        >
            {({ values, field, form }) => (
                <FormControl 
                    isInvalid={(form.errors['address.street'] ?? form?.errors?.address?.street) && form.touched?.address?.street } 
                    isRequired
                    
                >
                    <FormLabel 
                        htmlFor={'address.street'}
                        fontSize={12}
                    >
                        Street
                        
                    </FormLabel>
                    <Input 
                        {...field} 
                        autoComplete={'off'}
                        id='address.street' 
                        placeholder='' 
                        fontSize={13}
                        disabled={
                            form?.values?.barangay == null
                        }
                        variant={form?.values?.barangay == null ? 'filled' : 'outline'}
                        
                    />
                    <FormErrorMessage 
                        textAlign={'left'}
                        fontSize={12}
                    >
                        {
                            form.errors['address.street'] instanceof Map ? form.errors['address.street'].map((d, i) => {
                                return d;
                            }) : (form?.errors?.address?.street ?? form?.errors['address.street'])
                        }
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </GridItem>
    : ''
    }
    

    {/* Map */}
    {selectedBusinessType?.id >= 1 ? 
    <GridItem colSpan={[12, 12, 12, 12]}>
        <AspectRatio
            width={'100%'}
            height={'400px'}
        >
            <Maps
                center={pinMap}
                zoom={17}
                scrollWheelZoom={true}
                
            >
                <Pin 
                    position={{
                        lng: pinMap?.lng,
                        lat: pinMap?.lat
                    }}
                    PopupMessage={'Your are located here'}
                    onChange={(e) => {
                        setPinMap({
                            ...pinMap,
                            lng: e?.lng,
                            lat: e?.lat
                        });
                    }}
                />
            </Maps>

            
        </AspectRatio>

        <Text 
            mt={2}
            fontSize={12} 
            color={'red.500'}
        >
            REMINDER: <b>Pin the map according to your exact location.</b>
        </Text>
        
    </GridItem>
    : ''
    }