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
      const result = await axios.post('/api/Refuel', formData);
      toast.success('Abastecimento criado com sucesso');
      console.log(result);
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
            <label htmlFor="title">Título</label>
            <input
              type="text"
              {...register('title')}
              className="w-full"
              id="title"
              value="Abastecido para viagem"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              {...register('description')}
              className="w-full"
              id="description"
              value="abastecimento"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type">Tipo</label>
            <input
              type="text"
              {...register('type')}
              className="w-full"
              id="type"
              value="Gasolina"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="distance">Distância percorrida</label>
            <input
              type="text"
              {...register('distance')}
              className="w-full"
              id="distance"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="local">Local</label>
            <input
              type="text"
              {...register('local')}
              className="w-full"
              id="local"
              value="Posto Ipiranga"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date">Data</label>
            <input
              type="Date"
              {...register('date')}
              className="w-full"
              id="date"
              defaultValue={currentDate}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity">Quantidade</label>
            <input
              type="Number"
              {...register('quantity')}
              className="w-full"
              id="quantity"
              defaultValue={100}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price">Preço</label>
            <input
              type="Number"
              {...register('price')}
              className="w-full"
              id="price"
              defaultValue={100}
            />
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
