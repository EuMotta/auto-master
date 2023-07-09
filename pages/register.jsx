import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import axios from 'axios';

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
  const submitHandler = async ({ name, lastName, email, password,}) => {
    try {
        await axios.post('/api/auth/signup', {
            name,
            lastName,
            email,
            password
        })

        const result = await signIn('credentials', {
            redirect: false,
            lastName,
            email,
            password
        })

        if(result.error) {
            toast.error(result.error)
        }
    } catch (err) {
        toast.error(getError(err))
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

            <label htmlFor="name">Name</label>

            <input
                type="name"
                {...register('name', {
                required: 'Please enter your name',
                minLength: { value: 3, message: 'name needs to have at least 3 letters' },
                })}
                className="w-full"
                id="name"
                autoFocus
            />

            {errors.name && (<div className='text-sm text-red-500'>{errors.name.message}</div>)}


            <label htmlFor="lastName">Last Name</label>

            <input
                type="lastName"
                {...register('lastName', {
                required: 'Please enter your last name',
                minLength: { value: 3, message: 'last  name needs to have at least 3 letters' },
                })}
                className="w-full"
                id="lastName"
                autoFocus
            />

            {errors.lastName && (<div className='text-sm text-red-500'>{errors.lastName.message}</div>)}

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
            className="w-full"
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
              minLength: { value: 6, message: 'password is more than 5 chars' },
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
            register
          </button>
        </div>
        <div className="mb-4 ">
        already have an account? &nbsp;
          <Link href="login">Login</Link>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterScreen;
