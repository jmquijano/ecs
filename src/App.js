import logo from './logo.svg';
import AppRoutes from './routes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  
  return <HelmetProvider>
    <AppRoutes />
  </HelmetProvider>;
}

export default App;
