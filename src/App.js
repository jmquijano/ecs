import AppRoutes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import theme from './utils/theme';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';
import { AuthProvider } from './libs/auth';

function App() {
  
  return (
  <HelmetProvider>
    <ChakraProvider theme={theme} colorScheme={'brand'}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      

    </ChakraProvider>
  </HelmetProvider>);
}

export default App;
