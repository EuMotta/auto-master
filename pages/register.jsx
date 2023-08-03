import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';
import { getError } from '../utils/error';

const RegisterScreen = () => {
  const { data: session } = useSession();

  return (
    <Layout title="Register">
      <div className="bg-register py-20">
        <div className="bg-white rounded grid md:grid-cols-2 sm:max-w-xs md:max-w-5xl mx-auto my-10">
          <form
            className="max-w-screen prose md:prose-lg mx-auto md:mx-[40px] max-w-[200px] sm:max-w-[400px] md:max-w-full my-auto"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h3 className="!mb-5">Registre-se</h3>
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
                    onFocus={() => {
                      setTip(
                        'Primeiro nome do dono da conta, posteriormente pode ser utlizado para processar pagamentos.',
                      );
                    }}
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
                    onFocus={() => {
                      setTip(
                        'Sobrenome (todos os nomes além do primeiro), também utilizado para processar pagamentos.',
                      );
                    }}
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
                onFocus={() => {
                  setTip(
                    'Email que será utilizado para comunicações, tenha certeza que existe e te pertence.',
                  );
                }}
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
                onFocus={() => {
                  setTip(
                    ' Senha que será utilizada para realizar o login, deve conter pelo menos 6 caracteres, contendo: uma letra minúscula, uma letra maiúscula e um número.',
                  );
                }}
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4 ">
              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
            </div>
            <div className="mb-4 ">
              Já tem uma conta? &nbsp;
              <Link href="login">Faça Login</Link>
            </div>
          </form>
          <div className="flex align-middle items-center rounded-lg tips hidden md:flex bg-gradient-to-l from-yellow-300 to-yellow-100 min-h-[32rem] align-middle justify-center">
            <h3 className="prose-xl w-4/5 text-justify">{tip}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterScreen;
