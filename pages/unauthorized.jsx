import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import unauthorized from '@/public/images/unauthorized.svg';

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Acesso Negado">
      <div className="container mx-auto">
        <div className="grid grid-cols-2">
          <div className="prose md:prose-xl flex flex-col justify-center items-center">
            <h1 className="text-center !m-0 text-2xl">Acesso Negado</h1>
            {message && (
              <p className="mb-4 text-center text-red-500">{message}</p>
            )}
            <div className="">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="btn"
              >
                Voltar
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image src={unauthorized} height={600} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
