import { Select } from "@chakra-ui/react"
import { useEffect } from "react"

export default function BusinessDaySelector ({select, data, selected}) {
    return (
        <Select
            {...select}
        >
            <option value=""></option>
            {
                data?.map((d, i) => (
                    <option 
                        value={d?.shortname}
                        selected={selected == d?.fullname ? true : false}
                    >
                        {d?.fullname}
                    </option>
                ))
            }
        </Select>
    )
}