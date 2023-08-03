import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import carSVG from '@/public/images/loginSVG.svg';

const ForgotPasswordScreen = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
        session.user.isAdmin ? router.push(redirect || '/Admin/Dashboard') : router.push(redirect || '/User/ViewCars');
    }
  }, [router, session, redirect]);
  const {
      handleSubmit,
      register,
      formState: { errors },
  } = useForm();

  return (
    <Layout title="recuperarSenha">
      <div className="bg-login py-20">
        <div className="bg-white rounded grid md:grid-cols-2 sm:max-w-xs md:max-w-5xl mx-auto my-10">
          <div className="rounded-lg illustration hidden md:flex bg-gradient-to-l from-yellow-300 to-yellow-100 min-h-[32rem] align-middle justify-center">
            <Image src={carSVG} width={400} height={400} />
          </div>
          <form
            className="max-w-screen prose md:prose-lg mx-auto md:mx-[40px] max-w-[200px] sm:max-w-[400px] md:max-w-full my-auto"
            /*onSubmit={handleSubmit(submitHandler)}*/
          >
            <h3 className="!mb-5">Recuperar Senha</h3>
            <div className="mb-4">
              <label htmlFor="email">E-mail para recuperação</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Por favor, digite um email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Por favor, digite um email válido.',
                  },
                })}
                id="email"
                autoFocus
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4 ">
              <button type="submit" className="btn btn-primary">
                ENVIAR EMAIL
              </button>
            </div>
            <div className="mb-4 ">
              Não tem uma conta? &nbsp;
              <Link href="register">Cadastre-se</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordScreen;
