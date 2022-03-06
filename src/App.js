import logo from './logo.svg';
import AppRoutes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import theme from './utils/theme';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  
  return (
  <HelmetProvider>
    <ChakraProvider theme={theme} colorScheme={'brand'}>
      <AppRoutes />

    </ChakraProvider>
  </HelmetProvider>);
}

export default App;
