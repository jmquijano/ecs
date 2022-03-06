import AppRoutes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import theme from './utils/theme';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';

function App() {
  
  return (
  <HelmetProvider>
    <ChakraProvider theme={theme} colorScheme={'brand'}>
      <AppRoutes />

    </ChakraProvider>
  </HelmetProvider>);
}

export default App;
