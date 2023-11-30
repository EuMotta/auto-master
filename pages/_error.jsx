'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import img404 from '../public/images/404.svg';

const ErrorPage = () => {
  const [count, setCount] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 5995);

    const countdown = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdown);
    };
  }, []);

  return (
    <div className="bg-base-100 h-screen flex justify-center items-center">
      <div className="text-center flex flex-col justify-center items-center">
        <Image src={img404} width={400} />
        <div className="tracking-widest flex flex-col gap-4 mt-4">
          <span className="text-5xl">Página não encontrada</span>
          <span>
            <p className="text-center">
              {count >= 0 ? (
                `Você será redirecionado em: ${count}`
              ) : (
                <div className="flex items-center justify-center">
                  Redirecionando{'  '}
                  <span className="loading loading-dots loading-sm" />
                </div>
              )}
            </p>
          </span>
          <Link className="btn" href="/">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
