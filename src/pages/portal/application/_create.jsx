{/* DTI Trade Name */}
{selectedBusinessType?.shortname == "INDV" ?
<GridItem colSpan={[12, 12, 12, 6]}>
    <Field name='trade_name'>
        {({ field, form }) => (
            <FormControl 
                isInvalid={form.errors?.trade_name && form.touched?.trade_name} 
                isRequired={false}
            >
                <FormLabel 
                    htmlFor={'trade_name'}
                    fontSize={12}
                >
                    DTI Trade Name
                </FormLabel>
                <Input 
                    {...field} 
                    id='trade_name' 
                    placeholder='' 
                    fontSize={13}
                />
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form.errors?.trade_name instanceof Map ? form.errors?.trade_name.map((d, i) => {
                            return d;
                        }) : form?.errors?.trade_name
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ""}

{/* DTI Reg. No. */}
{selectedBusinessType?.shortname == "INDV" ?
<GridItem colSpan={[12, 12, 12, 3]}>
    <Field name='other.dti_registration_number'>
        {({ field, form }) => (
            <FormControl 
                isInvalid={form?.errors['other.dti_registration_number'] && form.touched?.other.dti_registration_number} 
                isRequired={false}
            >
                <FormLabel 
                    htmlFor={'other.dti_registration_number'}
                    fontSize={12}
                >
                    DTI Registry No.
                </FormLabel>
                <Input 
                    {...field} 
                    id='dti_registration_number' 
                    placeholder='' 
                    fontSize={13}
                />
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form?.errors['other.dti_registration_number'] instanceof Map ? form?.errors['other.dti_registration_number'].map((d, i) => {
                            return d;
                        }) : form?.errors['other.dti_registration_number']
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ""}

{/* DTI Registration Date */}
{selectedBusinessType?.shortname == "INDV" ?
<GridItem colSpan={[12, 12, 12, 3]}>
    <Field name='other.dti_registration_date'>
        {({ field, form }) => (
            <FormControl 
                isInvalid={form?.errors['other.dti_registration_date'] && form.touched?.other.dti_registration_date} 
                isRequired={false}
            >
                <FormLabel 
                    htmlFor={'other.dti_registration_date'}
                    fontSize={12}
                >
                    DTI Registry Date.
                </FormLabel>
                <Input 
                    {...field} 
                    id='dti_registration_date' 
                    placeholder='' 
                    fontSize={13}
                />
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form?.errors['other.dti_registration_date'] instanceof Map ? form?.errors['other.dti_registration_date'].map((d, i) => {
                            return d;
                        }) : form?.errors['other.dti_registration_date']
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ""}

{/* SEC Company Name */}
{selectedBusinessType?.shortname == "CORP" ||  selectedBusinessType?.shortname == "PRTN" || selectedBusinessType?.shortname == "COOP" ?
<GridItem colSpan={[12, 12, 12, 8]}>
    <Field name='taxpayer_name'>
        {({ field, form }) => (
            <FormControl 
                isInvalid={form?.errors?.taxpayer_name && form.touched?.taxpayer_name} 
                isRequired={false}
            >
                <FormLabel 
                    htmlFor={'taxpayer_name'}
                    fontSize={12}
                >
                    SEC Registered {selectedBusinessType?.fullname} Name
                </FormLabel>
                <Input 
                    {...field} 
                    id='taxpayer_name' 
                    placeholder='' 
                    fontSize={13}
                />
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form?.errors?.taxpayer_name instanceof Map ? form?.errors?.taxpayer_name.map((d, i) => {
                            return d;
                        }) : form?.errors?.taxpayer_name
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ""}

{/* SEC Registration No. */}
{selectedBusinessType?.shortname == "CORP" ||  selectedBusinessType?.shortname == "PRTN" || selectedBusinessType?.shortname == "COOP" ?
<GridItem colSpan={[12, 12, 12, 4]}>
    <Field name='other.sec_registration_number'>
        {({ field, form }) => (
            <FormControl 
                isInvalid={form?.errors['other.sec_registration_number'] && form.touched?.other.sec_registration_number} 
                isRequired={false}
            >
                <FormLabel 
                    htmlFor={'other.sec_registration_number'}
                    fontSize={12}
                >
                    SEC Registration No.
                </FormLabel>
                <Input 
                    {...field} 
                    id='sec_registration_number' 
                    placeholder='' 
                    fontSize={13}
                />
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form?.errors['other.sec_registration_number'] instanceof Map ? form?.errors['other.sec_registration_number'].map((d, i) => {
                            return d;
                        }) : form?.errors['other.sec_registration_number']
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ""}

{/* CDA Registered Name */}
{selectedBusinessType?.shortname == "COOP" ?
<GridItem colSpan={[12, 12, 12, 8]}>
    <Field name='taxpayer_name'>
        {({ field, form }) => (
            <FormControl 
                isInvalid={form?.errors?.taxpayer_name && form.touched?.taxpayer_name} 
                isRequired={false}
            >
                <FormLabel 
                    htmlFor={'taxpayer_name'}
                    fontSize={12}
                >
                    CDA Registered Name
                </FormLabel>
                <Input 
                    {...field} 
                    id='taxpayer_name' 
                    placeholder='' 
                    fontSize={13}
                />
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form?.errors?.taxpayer_name instanceof Map ? form?.errors?.taxpayer_name.map((d, i) => {
                            return d;
                        }) : form?.errors?.taxpayer_name
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ""}

{/* CDA Registration Number */}
{selectedBusinessType?.shortname == "COOP" ?
<GridItem colSpan={[12, 12, 12, 4]}>
    <Field name='other.cda_registration_number'>
        {({ field, form }) => (
            <FormControl 
                isInvalid={form?.errors['other.cda_registration_number'] && form.touched?.other.cda_registration_number} 
                isRequired={false}
            >
                <FormLabel 
                    htmlFor={'other.cda_registration_number'}
                    fontSize={12}
                >
                    CDA Registration Number
                </FormLabel>
                <Input 
                    {...field} 
                    id='cda_registration_number' 
                    placeholder='' 
                    fontSize={13}
                />
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form?.errors['other.cda_registration_number'] instanceof Map ? form?.errors['other.cda_registration_number'].map((d, i) => {
                            return d;
                        }) : form?.errors['other.cda_registration_number']
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ""}

{/* BIR TIN */}
{selectedBusinessType?.id >= 1 ? 
    <GridItem colSpan={[12, 12, 4, 4]}>
        <Field 
            name='other.tin'
        >
            {({ field, form }) => (
                <FormControl 
                    isInvalid={form.errors?.other?.tin && form.touched?.other?.tin} 
                    
                >
                    <FormLabel 
                        htmlFor={'other.tin'}
                        fontSize={12}
                    >
                        BIR TIN
                    </FormLabel>
                    <Stack direction={'row'}>
                        <Input
                            name={'other.tin1'}
                            fontSize={13}
                            maxLength={3}
                            placeholder={'000'}
                            onChange={e => handleTinChange(1, e)}
                        />
                        <Input
                            name={'other.tin2'}
                            fontSize={13}
                            maxLength={3}
                            placeholder={'000'}
                            onChange={e => handleTinChange(2, e)}
                        />
                        <Input
                            name={'other.tin3'}
                            fontSize={13}
                            maxLength={3}
                            placeholder={'000'}
                            onChange={e => handleTinChange(3, e)}
                        />
                        <Input
                            name={'other.branch_code'}
                            fontSize={13}
                            maxLength={5}
                            placeholder={'00000'}
                            onChange={e => handleTinChange(4, e)}
                        />
                    </Stack>
                    
                    <FormErrorMessage 
                        textAlign={'left'}
                        fontSize={12}
                    >
                        {
                            form.errors['other.tin'] instanceof Map ? form.errors['other.tin'].map((d, i) => {
                                return d;
                            }) : form.errors?.other?.tin
                        }
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    </GridItem>
:
''
}

{/* BIR RDO */}
{selectedBusinessType?.id >= 1 ?
<GridItem colSpan={[12, 12, 8, 8]}>
    <Field 
        name='other.rdo_code'
    >
        {({ field, form }) => (
            <FormControl 
                isInvalid={form.errors?.other?.rdo_code && form.touched?.other?.rdo_code} 
                
            >
                <FormLabel 
                    htmlFor={'other.rdo_code'}
                    fontSize={12}
                >
                    BIR RDO
                </FormLabel>
                <Select
                    {...field}
                    id={'other.rdo_code'}
                    fontSize={13}
                >
                    <option value=""></option>
                    {
                        birRdo.map((d, i) => (
                            <option value={d?.id}>{d?.code + " : " + d?.name}</option>
                        ))
                    }
                </Select>
                <FormErrorMessage 
                    textAlign={'left'}
                    fontSize={12}
                >
                    {
                        form.errors?.other?.rdo_code instanceof Map ? form.errors?.other?.rdo_code.map((d, i) => {
                            return d;
                        }) : form.errors?.other?.rdo_code
                    }
                </FormErrorMessage>
            </FormControl>
        )}
    </Field>
</GridItem>
: ''
}