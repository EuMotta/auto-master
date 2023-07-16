import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Acesso Negado">
      <div className="container paddings mx-auto">
        <div className="prose md:prose-xl flex flex-col  mx-auto justify-center items-center">
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
      </div>
    </Layout>
  );
};

export default Unauthorized;
