'use client'

import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  </SessionProvider>
);

function Auth({children}) {
  const router = useRouter();
  const {status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Por favor acesse a sua conta');
    },
  });

  if(status === 'loading') {
    return <div>Carregando...</div>;
  }

  if(adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=Acesse a conta de administrador');
  }

  return children;
}

export default MyApp;
