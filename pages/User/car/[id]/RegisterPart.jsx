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
  const submitHandler = async (formData) => {
    try {
      formData.owner = session?.user?._id;
      formData.carId = query.id;
      await axios.post('/api/Part', formData);
      toast.success('Parte criada com sucesso');
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
          <label htmlFor="title">
            Nome <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            {...register('title', { required: 'Nome é obrigatório' })}
            className={`w-full ${errors.title ? 'border-red-500' : ''}`}
            id="title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price">
            Preço <span className="text-red-500"> *</span>
          </label>
          <input
            type="number"
            {...register('price', { required: 'Preço é obrigatório' })}
            className={`w-full ${errors.price ? 'border-red-500' : ''}`}
            id="price"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        {optionQuant.map((_, key) => (
          <div key={key}>
            <div className="mb-4">
              <label htmlFor={`optionTitle[${key}].value`}>
                Título da Opção {key + 1} <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                {...register(`optionTitle[${key}].value`, {
                  required: 'Preencha o campo',
                })}
                id={`optionTitle[${key}].value`}
                className={`w-full ${
                  errors.optionTitle &&
                  errors.optionTitle[key] &&
                  errors.optionTitle[key].value
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {errors.optionTitle &&
                errors.optionTitle[key] &&
                errors.optionTitle[key].value && (
                  <p className="text-red-500">
                    {errors.optionTitle[key].value.message}
                  </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor={`optionValue[${key}].value`}>
                Valor da Opção {key + 1} <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                {...register(`optionValue[${key}].value`, {
                  required: 'Preencha o campo',
                })}
                id={`optionValue[${key}].value`}
                className={`w-full ${
                  errors.optionValue &&
                  errors.optionValue[key] &&
                  errors.optionValue[key].value
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {errors.optionValue &&
                errors.optionValue[key] &&
                errors.optionValue[key].value && (
                  <p className="text-red-500">
                    {errors.optionValue[key].value.message}
                  </p>
              )}
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
            Registrar Parte
          </button>
        </div>
      </form>
    </Layout>
  );
};
RegisterPart.auth = true;
export default RegisterPart;
