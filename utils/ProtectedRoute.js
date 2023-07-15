import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  const isUserRoute = router.pathname.startsWith('/User/');

  useEffect(() => {
    if (isUserRoute && status === 'unauthenticated') {
      router.push('/login');
      return <div>Carregando...</div>;
    }

    if (router.pathname === '/Admin' && !session?.user?.isAdmin) {
      return <div>Carregando...</div>;
    }
  }, [isUserRoute, status, session, router]);

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  return children;
};

export default ProtectedRoute;
