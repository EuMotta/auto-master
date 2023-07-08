import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';

const App = ({ Component, pageProps }) => (
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
);

export default App;
