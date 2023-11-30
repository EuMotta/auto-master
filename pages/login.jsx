/* eslint-disable no-unused-expressions */
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import carSVG from '@/public/images/carro.svg';

const LoginScreen = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      session.user.isAdmin
        ? router.push(redirect || '/Admin/Dashboard')
        : router.push(redirect || '/User/ViewCars');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <div className="">
        <div className="bg-white grid grid-cols-2">
          <form
            className="max-w-screen my-auto paddings col-span-2 md:col-span-1"
            onSubmit={handleSubmit(submitHandler)}
            style={{
              flex: 1,
            }}
          >
            <h3 className="!mb-5 !text-center !text-3xl">Login</h3>
            <div className="mb-4">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Por favor, digite o email',
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
            <div className="mb-4">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Por favor, digite a senha',
                  minLength: {
                    value: 3,
                    message: 'A senha precisa ter 5 ou mais caracteres',
                  },
                })}
                id="password"
                autoFocus
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4 text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="mb-4 text-base text-center text-black">
              <Link href="register">Ainda não tem conta?</Link>
            </div>
            <div className="mb-4 text-base text-center text-black">
              <Link href="forgotPassword">Recuperar Senha</Link>
            </div>
          </form>
          <div className="illustration p-6 hidden md:flex bg-gray min-h-[620px] align-middle justify-center">
            <div className="text-center p-9 flex-column">
              <Image src={carSVG} width={500} height={500} />

              <p className="text-base font-medium  text-xl p-3">O controle do seu veículo de forma prática</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginScreen;
