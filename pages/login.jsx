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
import carSVG from '@/public/images/loginSVG.svg';

const LoginScreen = () => {
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
      <div className="bg-login py-20">
        <div className="bg-white rounded grid md:grid-cols-2 sm:max-w-xs md:max-w-5xl mx-auto my-10">
          <div className="rounded-lg illustration hidden md:flex bg-gradient-to-l from-yellow-300 to-yellow-100 min-h-[32rem] align-middle justify-center">
            <Image src={carSVG} width={400} height={400} />
          </div>
          <form
            className="max-w-screen prose md:prose-lg mx-auto md:mx-[40px] max-w-[200px] sm:max-w-[400px] md:max-w-full my-auto"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h3 className="!mb-5">Login</h3>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
                className="w-full focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-secondary focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                id="email"
                autoFocus
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Please enter password',
                  minLength: { value: 3, message: 'password is more than 5 chars' },
                })}
                className="w-full focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-secondary focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                id="password"
                autoFocus
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4 ">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="mb-4 ">
              Don&apos;t have an account? &nbsp;
              <Link href="register">Register</Link>
            </div>
          </form>
        </div>
      </div>

    </Layout>
  );
};

export default LoginScreen;
