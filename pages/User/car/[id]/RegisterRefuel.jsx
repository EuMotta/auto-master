/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useEffect, useReducer, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, car: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}
const RegisterRefuel = () => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const [selectedPartId, setSelectedPartId] = useState('');
  const carId = query.id;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [{ loading, error, car }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    car: {},
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/car/${carId}`);
        data.refuels = await axios.get(`/api/car/${carId}/refuels`);
        data.refuels = data.refuels.data;
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log(data.refuels);
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchCar();
  }, []);

  const submitHandler = async (formData) => {
    console.log(formData.carId);
    try {
      formData.partId = selectedPartId;
      formData.carId = carId;
      console.log(formData);
      await axios.post('/api/Refuel', formData);
      toast.success('Abastecimento criado com sucesso');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/User/car/${query.id}`);
      /*       router.push(`/User/car/${query.id}`); */
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const formattedDate = new Date().toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);
  return (
    <Layout title="Register Maintenance">
      {session?.user ? (
        <form
          className="mx-auto max-w-screen-md bg-base-500"
          onSubmit={handleSubmit(submitHandler)}
        >
          {carId}
          <h1 className="mb-4 text-xl">Registrar Abastecimento</h1>
          <div className="mb-4">
            <label htmlFor="title">
              Título <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Título é obrigatório' })}
              className={`w-full ${errors.title ? 'border-red-500' : ''}`}
              id="title"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description">
              Descrição <span className="text-red-500"> *</span>
            </label>
            <textarea
              {...register('description', {
                required: 'Descrição é obrigatória',
              })}
              className={`w-full ${errors.description ? 'border-red-500' : ''}`}
              id="description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="type">
              Tipo <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              {...register('type', { required: 'Tipo é obrigatório' })}
              className={`w-full ${errors.type ? 'border-red-500' : ''}`}
              id="type"
            />
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="distance">Distância percorrida</label>
            <input
              type="text"
              {...register('distance', { required: 'Distância é obrigatória' })}
              className={`w-full ${errors.distance ? 'border-red-500' : ''}`}
              id="distance"
            />
            {errors.distance && (
              <p className="text-red-500">{errors.distance.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="local">Local</label>
            <input
              type="text"
              {...register('local')}
              className="w-full"
              id="local"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date">
              Data <span className="text-red-500"> *</span>
            </label>
            <input
              type="Date"
              {...register('date', { required: 'Data é obrigatória' })}
              className={`w-full ${errors.date ? 'border-red-500' : ''}`}
              id="date"
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity">
              Quantidade <span className="text-red-500"> *</span>
            </label>
            <input
              type="Number"
              {...register('quantity', { required: 'Data é obrigatória' })}
              className={`w-full ${errors.quantity ? 'border-red-500' : ''}`}
              id="quantity"
              defaultValue={100}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="price">
              Preço <span className="text-red-500"> *</span>
            </label>
            <input
              type="Number"
              {...register('price', { required: 'Data é obrigatória' })}
              className={`w-full ${errors.price ? 'border-red-500' : ''}`}
              id="price"
              defaultValue={100}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="mb-4">
            <button type="submit" className="primary-button">
              Registrar Abastecimento
            </button>
          </div>
        </form>
      ) : (
        ' '
      )}
    </Layout>
  );
};
RegisterRefuel.auth = true;
export default RegisterRefuel;
