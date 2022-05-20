const { ScaleLoader, PulseLoader, GridLoader } = require("react-spinners")

const Loader = {
    ScaleLoader: (props) => {
        return (
            <ScaleLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} />
        )
    },
    PulseLoader: (props) => {
        return (
            <PulseLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} />
        );
    },
    GridLoader: (props) => {
        return (
            <GridLoader color={props?.color ?? 'var(--bfp-colors-brand-200)'} />
        )
    }
}

export { Loader };