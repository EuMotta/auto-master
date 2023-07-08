// pages/_app.js ou app/provider.js
import { useRouter } from 'next/router';
import { SessionProvider, useSession } from 'next-auth/react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    {Component.auth ? (
      <Auth>
        <Component {...pageProps} />
      </Auth>
    ) : (
      <Component {...pageProps} />
    )}
  </SessionProvider>
);

const Auth = ({ children, adminOnly }) => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Por favor, acesse sua conta.');
    },
  });
  if (status === 'loading') {
    return <div>Carregando...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push(
      '/unauthorized?message=Administrador, por favor, acesse sua conta.',
    );
  }

  return children;
};

export default MyApp;
