import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';
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

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="name">Nome</label>

          <input
            type="name"
            {...register('name', {
              required: 'Por favor, digite seu nome',
              minLength: {
                value: 3,
                message: 'O nome precisa ter pelo menos três letras',
              },
            })}
            className="w-full"
            id="name"
            autoFocus
          />

          {errors.name && (
            <div className="text-sm text-red-500">{errors.name.message}</div>
          )}

          <label htmlFor="lastName">Sobrenome</label>

          <input
            type="lastName"
            {...register('lastName', {
              required: 'Por favor, digite seu sobrenome',
              minLength: {
                value: 3,
                message: 'O sobrenome deve ter pelo menos três letras',
              },
            })}
            className="w-full"
            id="lastName"
            autoFocus
          />

          {errors.lastName && (
            <div className="text-sm text-red-500">
              {errors.lastName.message}
            </div>
          )}

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
              minLength: { value: 6, message: 'A senha deve ter 6 ou mais caracteres' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message: 'A senha deve ter um caractere maiúsculo, um minúsculo e um número.',
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
        <div className="mb-4 ">
          <button type="submit" className="primary-button">
            Cadastrar
          </button>
        </div>
        <div className="mb-4 ">
          Já tem uma conta? &nbsp;
          <Link href="login">Faça login</Link>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterScreen;
