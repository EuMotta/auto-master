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
      return state;
  }
}
const RegisterMaintenance = () => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const [selectedPartId, setSelectedPartId] = useState('');
  const carId = query.id;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [{ car }, dispatch] = useReducer(reducer, {
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
        data.parts = await axios.get(`/api/car/${carId}/parts`);
        data.parts = data.parts.data;
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log(data.parts);
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
      const result = await axios.post('/api/Maintenance', formData);
      toast.success('Manutenção criada com sucesso');
      console.log(result);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/User/car/${query.id}`);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Register Maintenance">
      {session?.user ? (
        <form
          className="mx-auto max-w-screen-md bg-base-500"
          onSubmit={handleSubmit(submitHandler)}
        >
          {carId}
          <h1 className="mb-4 text-xl">Registrar Manutenção</h1>
          <div className="mb-4">
            <label htmlFor="title">Título<span className="text-red-500"> *</span></label>
            <input
              type="text"
              {...register('title', { required: 'Preencha o campo' })}
              className={`w-full ${errors.title ? 'border-red-500' : ''}`}
              id="title"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          {car.parts && (
            <div className="mb-4">
              <label htmlFor="partId">Selecione a Parte<span className="text-red-500"> *</span></label>
              <select
                id="partId"
                value={selectedPartId}
                {...register('partId', { required: 'Selecione a parte' })}
                onChange={(e) => setSelectedPartId(e.target.value)}
                className={`w-full ${errors.PartId ? 'border-red-500' : ''}`}
              >
                <option value="">Parte</option>
                {car.parts.map((part) => (
                  <option key={part._id} value={part._id}>
                    {part.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          {errors.partId && (
            <p className="text-red-500">{errors.partId.message}</p>
          )}
          <div className="mb-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              {...register('description')}
              className="w-full"
              id="description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="date">Data<span className="text-red-500"> *</span></label>
            <input
              type="Date"
              {...register('date', { required: 'Adicione uma data' })}
              className={`w-full ${errors.date ? 'border-red-500' : ''}`}
              id="date"
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="price">Preço<span className="text-red-500"> *</span></label>
            <input
              type="Number"
              {...register('price', { required: 'Preço é obrigatório' })}
              className={`w-full ${errors.price ? 'border-red-500' : ''}`}
              id="price"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="mb-4">
            <button type="submit" className="primary-button">
              Registrar Manutenção
            </button>
          </div>
        </form>
      ) : (
        ' '
      )}
    </Layout>
  );
};
RegisterMaintenance.auth = true;
export default RegisterMaintenance;
