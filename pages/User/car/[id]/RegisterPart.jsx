/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';

const RegisterPart = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { query } = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const submitHandler = async (formData) => {
    try {
      formData.owner = session?.user?._id;
      formData.carId = query.id;
      console.log(formData);
      const result = await axios.post('/api/Part', formData);
      toast.success('Parte criada com sucesso');
      console.log(result);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/User/car/${query.id}`);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const [optionQuant, setOptionQuant] = useState([[]]);

  return (
    <Layout title="Register Part">
      <form
        className="mx-auto max-w-screen-md bg-base-500"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Registrar Parte</h1>
        <div className="mb-4">
          <label htmlFor="title">Nome</label>
          <input
            type="text"
            {...register('title')}
            className="w-full"
            id="title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            {...register('price')}
            className="w-full"
            id="price"
          />
        </div>

        {optionQuant.map((_, key) => (
          <div key={key}>
            <div className="mb-4">
              <label htmlFor={`optionTitle[${key}].value`}>
                Título da Opção
              </label>
              <input
                type="text"
                {...register(`optionTitle[${key}].value`)}
                id={`optionTitle[${key}].value`}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor={`optionValue[${key}].value`}>
                Valor da Opção
              </label>
              <input
                type="text"
                {...register(`optionValue[${key}].value`)}
                id={`optionValue[${key}].value`}
                className="w-full"
              />
            </div>
          </div>
        ))}

        <button
          className="btn"
          type="button"
          onClick={() => setOptionQuant(optionQuant.concat([[]]))}
        >
          <BsPlusLg />
        </button>

        <div className="mb-4">
          <button type="submit" className="primary-button">
            Register Car
          </button>
        </div>
      </form>
    </Layout>
  );
};
RegisterPart.auth = true;
export default RegisterPart;
