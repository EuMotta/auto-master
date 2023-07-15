/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
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

const EditCar = () => {
  const { query } = useRouter();
  const router = useRouter();
  const { data: session } = useSession();
  const carId = query.id;
  const [formData, setFormData] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/car/${carId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setFormData(data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [carId]);
  console.log(query.id);
  console.log(session?.user?._id);

  const submitHandler = async (formData) => {
    try {
      formData.owner = session?.user?._id;
      formData.carId = query.id;
      console.log(formData);
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/car/${carId}`, formData);
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Carro atualizado.');
      router.push(`/User/car/${query.id}`);
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Edit Car">
      <form
        className="mx-auto max-w-screen-md bg-base-500"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Edit Car</h1>
        <div className="mb-4">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            {...register('brand')}
            className="w-full"
            id="brand"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            {...register('model')}
            required
            className="w-full"
            id="model"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fueltype">Fuel Type</label>
          <input
            type="text"
            {...register('fueltype')}
            required
            className="w-full"
            id="fueltype"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hodometro">Hodometro</label>
          <input
            type="number"
            {...register('hodometro')}
            required
            className="w-full"
            id="hodometro"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color">Cor</label>
          <input
            type="text"
            {...register('color')}
            required
            className="w-full"
            id="color"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year">Ano</label>
          <input
            type="text"
            {...register('year')}
            required
            className="w-full"
            id="year"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="licensePlate">Placa</label>
          <input
            type="text"
            {...register('licensePlate')}
            required
            className="w-full"
            id="licensePlate"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="chassis">Chassi</label>
          <input
            type="text"
            {...register('chassis')}
            required
            className="w-full"
            id="chassis"
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="primary-button">
            Edit Car
          </button>
        </div>
      </form>
    </Layout>
  );
};

EditCar.auth = true;
export default EditCar;
