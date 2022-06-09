import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';


const breakpoints = createBreakpoints({
  sm: "30em", //480px
  md: "48em", //768px
  lg: "62em", //992px
  xl: "80em", //1280px
  "xxl": "96em",//1536px
})

/**
 * Component: Input
 */
const Input = {
    baseStyle: {
        field: {
        background: 'pink',
        color: 'gray.700',
        },
    },
    defaultProps: {
        focusBorderColor: 'brand.50',
    },
}

const Select = {
  baseStyle: {
    field: {
      background: 'transparent',
      color: 'gray.700',
    },
  },
  defaultProps: {
      focusBorderColor: 'brand.50',
  },
}

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    brand: {
        50: '#e77f5b',
        100: 'e46d43',
        200: '#e05a2c',
        300: '#e05a2c',
        400: '#e05a2c',
        500: '#e05a2c' 
    }
  },
  components: { 
    Link: { baseStyle: { _focus: { boxShadow: 'none' } } }, 
    Button: {
      baseStyle: {
        minWidth: '100%',
        fontWeight: 'normal', // Normally, it is "semibold",
        _focus: { 
          boxShadow: 'none' 
        }
      },
      
      sizes: {
        
      },
      variants: {

        'white-text': {
          color: 'white',
          _hover: {
            color: 'white',
          },
          _focus: {
            boxShadow: 'none',
          },
        },
        'brand-color-text': {
          color: 'brand.200',
          _hover: {
            color: 'brand.200',
          },
          _focus: {
            boxShadow: 'none',
          },
        },
        'mobile-active': {
          color: 'rgba(224,90,44, 1)',
          border: '1px solid',
          marginBottom: 0,
          marginTop: '0px !important',
          bg: 'rgba(224,90,44, 0.15)',
          _hover: {
            color: 'white',
            bg: 'brand.200'
          },
          _focus: {
            boxShadow: 'none',
          },
        },
        'mobile-outline': {
          color: 'brand.200',
          border: '1px solid',
          borderColor: 'brand.200',
          marginTop: '0px !important',
          _hover: {
            color: 'white',
            bg: 'brand.200'
          },
          _active: {
            bg: 'brand.200'
          },
          _focus: {
            boxShadow: 'none',
          },
        },
        active: {
          color: 'white',
          border: '1px solid',
          bg: 'brand.200',
          _hover: {
            color: 'white',
            bg: 'brand.200'
          },
          _focus: {
            boxShadow: 'none',
          },
        },
        outline: {
          color: 'brand.200',
          border: '1px solid',
          borderColor: 'brand.200',
          _hover: {
            color: 'white',
            bg: 'brand.200'
          },
          _active: {
            bg: 'brand.200'
          },
          _focus: {
            boxShadow: 'none',
          },
        },
        ghost: {
          cursor: 'pointer',
          bg: 'transparent',
          color: 'brand.200',
          border: '1px solid',
          borderColor: 'transparent',
          _hover: {
            bg: 'transparent',
            border: '1px solid',
            borderColor: 'brand.200'
          }
        }
      },
    },
    Select,
    Input,
    Steps
  },
  breakpoints,
  config: {
    cssVarPrefix: 'bfp',
  },
  
})

export default theme