import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  </SessionProvider>
);

export default MyApp;
