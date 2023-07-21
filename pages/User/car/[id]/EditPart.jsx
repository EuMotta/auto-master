/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { BsPlusLg } from 'react-icons/bs';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, part: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, successUpdate: true };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_RESET':
      return { ...state, loadingUpdate: false, successUpdate: false };
    default:
      state;
  }
}

const EditPart = () => {
  const router = useRouter();
  const { id: carId, partId } = router.query;
  const { data: session } = useSession();
  const [formData, setFormData] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/Part/${partId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setFormData(data);
        setValue('title', data.title);
        setValue('price', data.price);
        data.options.forEach((option, index) => {
          setValue(`optionTitle[${index}].value`, option.title);
          setValue(`optionValue[${index}].value`, option.value);
        });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchPartData();
  }, [partId]);

  const submitHandler = async (formData) => {
    try {
      formData.carId = carId;
      console.log(formData);
      dispatch({ type: 'UPDATE_REQUEST' });
      const result = await axios.put(`/api/Part/${partId}`, formData);
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Parte atualizada com sucesso');
      console.log(result);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/User/car/${carId}`);
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const [optionQuant, setOptionQuant] = useState([[]]);

  return (
    <Layout title="Register Part">
      id:{carId}
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
            defaultValue={formData?.title}
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
            Registrar Parte
          </button>
        </div>
      </form>
    </Layout>
  );
};

EditPart.auth = true;
export default EditPart;
