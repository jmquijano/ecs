import { Text } from "@chakra-ui/react";
import { Fragment } from "react";

export default function FileUpload(props) {
    const { id } = props;

    return (
        <Fragment>
            <Text>{id}</Text>
        </Fragment>
    );
}