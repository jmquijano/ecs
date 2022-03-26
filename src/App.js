import AppRoutes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import theme from './utils/theme';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';
import { AuthProvider } from './libs/auth';
import { FsedProvider } from './libs/fsed';

function App() {
  
  return (
  <HelmetProvider>
    <ChakraProvider theme={theme} colorScheme={'brand'}>
      <FsedProvider>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
      </FsedProvider>
      
      

    </ChakraProvider>
  </HelmetProvider>);
}

export default App;
