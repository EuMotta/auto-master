
import Image from 'next/image';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';

import carSVG from '@/public/images/carcad.svg';
import { getError } from '../utils/error';

const RegisterScreen = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, lastName, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        lastName,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        lastName,
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

  // const [tip, setTip] = useState('');

  return (
    <Layout title="Register">
      <div className="bg-white grid md:grid-cols-2">
        <div className="illustration p-6 hidden md:flex bg-gray min-h-[620px] align-middle justify-center">
          <div className="text-center p-9 flex-column">
            <Image src={carSVG} width={500} height={500} />

            <p className="text-base font-medium  text-xl p-3">O controle do seu veículo de forma prática</p>
          </div>
        </div>

        <form
          className="max-w-screen prose md:prose-lg mx-auto md:mx-[40px] max-w-[200px] sm:max-w-[400px] md:max-w-full my-auto p-"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h3 className="!mb-5 text-center text-lg">Registre-se</h3>
          <div className="mb-4">
            <div className="grid grid-cols-2">
              <div className="first-name">
                <label htmlFor="name" className="mr-2">
                  Nome
                </label>
                <input
                  type="name"
                  {...register('name', {
                    required: 'Por favor, digite seu nome',
                    minLength: {
                      value: 3,
                      message: 'O nome precisa ter pelo menos três letras',
                    },
                  })}
                  className="w-full mr-2"
                  id="name"
                  autoFocus
                />

                {errors.name && (
                  <div className="text-sm text-red-500">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div className="last-name">
                <label htmlFor="lastName" className="ml-2">
                  Sobrenome
                </label>

                <input
                  type="lastName"
                  {...register('lastName', {
                    required: 'Por favor, digite seu sobrenome',
                    minLength: {
                      value: 3,
                      message: 'O sobrenome deve ter pelo menos três letras',
                    },
                  })}
                  className="w-full ml-2"
                  id="lastName"
                  autoFocus
                />

                {errors.lastName && (
                  <div className="text-sm text-red-500">
                    {errors.lastName.message}
                  </div>
                )}
              </div>
            </div>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Por favor, digite o e-mail',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Por favor, digite um e-mail válido',
                },
              })}
              className="w-full"
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
                  value: 6,
                  message: 'A senha deve ter 6 ou mais caracteres',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                  message:
                    'A senha deve ter um caractere maiúsculo, um minúsculo e um número.',
                },
              })}
              className="w-full"
              id="password"
              autoFocus
            />
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4 text-center pt-3">
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </div>
          <div className="text-center text-gray-500 text-base"><a href="login" className="no-underline">Já tem conta?</a></div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterScreen;
