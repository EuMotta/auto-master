'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../styles/globals.css';
import Image from 'next/image';
import Error404 from '../../public/images/Error404.svg';

const ErrorPage = () => {
  const [count, setCount] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 1000000);

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
      <div className="text-center">
        <Image src={Error404} width={500} height={500} />
        <div className="tracking-widest mt-4">
          <span className="text-5xl">Essa pagina não existe</span>
          <span>
            <p className="text-center">Você será redirecionado em: {count}</p>
          </span>
        </div>
        <div className="mt-6">
          <div className="flex gap-3 mb-2">
            <p className="text-center">Essa página deveria existir?</p>
            <Link className="underline" href="/">
              {' '}
              <p>Entre em contato</p>
            </Link>
          </div>
          <Link href="/">
            <button
              type="button"
              className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
            >
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
