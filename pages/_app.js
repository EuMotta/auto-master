/* eslint-disable no-unused-vars */

'use client';

import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { StoreProvider } from '../utils/Store';
import ProtectedRoute from '@/utils/ProtectedRoute';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <StoreProvider>
      {Component.auth ? (
        <Auth adminOnly={Component.auth.adminOnly}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </StoreProvider>
  </SessionProvider>
);

const Auth = ({ children, adminOnly }) => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Por favor acesse a sua conta');
    },
  });

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  if (adminOnly && !session?.user?.isAdmin) {
    router.push('/unauthorized?message=Acesse a conta de administrador');
  }

  return children;
};

export default MyApp;
