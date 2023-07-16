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

  const [{ loading, error, car }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    car: {},
  });

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
      toast.success('Parte criada com sucesso');
      console.log(result);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      /*       router.push(`/User/car/${query.id}`); */
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
          <h1 className="mb-4 text-xl">Registrar Parte</h1>
          <div className="mb-4">
            <label htmlFor="title">titulo</label>
            <input
              type="text"
              {...register('title')}
              className="w-full"
              id="title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subtitle">subtitulo</label>
            <input
              type="text"
              {...register('subtitle')}
              className="w-full"
              id="subtitle"
            />
          </div>
          {car.parts && (
            <div className="mb-4">
              <label htmlFor="partId">Select Part</label>
              <select
                id="partId"
                value={selectedPartId}
                {...register('partId')}
                onChange={(e) => setSelectedPartId(e.target.value)}
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
          <div className="mb-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              {...register('description')}
              className="w-full"
              id="description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date">Data</label>
            <input
              type="Date"
              {...register('date')}
              className="w-full"
              id="date"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price">Preço</label>
            <input
              type="Number"
              {...register('price')}
              className="w-full"
              id="price"
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="primary-button">
              Register Car
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
