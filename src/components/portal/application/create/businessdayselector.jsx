import { Select } from "@chakra-ui/react"

export default function BusinessDaySelector ({select, data}) {
    return (
        <Select
            {...select}
        >
            <option value=""></option>
            {
                data?.map((d, i) => (
                    <option value={d?.shortname}>{d?.fullname}</option>
                ))
            }
        </Select>
    )
}