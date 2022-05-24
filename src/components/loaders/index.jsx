import { Spinner } from "@chakra-ui/react";

const { ScaleLoader, PulseLoader, GridLoader, PuffLoader, SyncLoader } = require("react-spinners")

const Loader = {
    ScaleLoader: (props) => {
        return (
            <ScaleLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} {...props} />
        )
    },
    PulseLoader: (props) => {
        return (
            <PulseLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} {...props} />
        );
    },
    GridLoader: (props) => {
        return (
            <GridLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} {...props} />
        )
    },
    PuffLoader: (props) => {
        return (
            <PuffLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} {...props} />
        )
    },
    SyncLoader: (props) => {
        return (
            <SyncLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} {...props} />
        )
    },
    Default: (props) => {
        return (
            <Spinner
                
                emptyColor='gray.200'
                color={props?.color ?? 'var(--bfp-colors-brand-200)'}
                {...props}
            />
        )
    }
}

export { Loader };