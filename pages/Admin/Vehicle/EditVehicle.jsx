/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect, useReducer, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import AdminLayout from '../components/AdminLayout';

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

const EditVehicle = () => {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { carId } = router.query;
  const [formData, setFormData] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      console.log(carId);
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/car/${carId}`);
        setFormData(data);
        setLoading(false);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
        setLoading(false);
        setError(getError(err));
      }
    };
    fetchData();
  }, [carId]);

  const submitHandler = async (formData) => {
    try {
      await axios.put(`/api/admin/car/${carId}`, formData);
      toast.success('Informações Atualizadas.');
    } catch (err) {
      setError(getError(err));
      toast.error(getError(err));
    }
  };
  return (
    <div className="">
      {session.user?.isAdmin ? (
        status === 'loading' ? (
          <span className="loading loading-bars loading-xs" />
        ) : loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg" />
          </div>
        ) : error ? (
          <div className="text-lg text-red-600">{error}</div>
        ) : (
          <AdminLayout>
            <form
              className="mx-auto max-w-screen-md bg-base-500"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">Edite as informações do veículo</h1>
              <div className="mb-4">
                <label htmlFor="type">Selecione o tipo de veículo</label>
                <select id="type" {...register('type')}>
                  <option value="">Selecionar</option>
                  <option value={1}>Carro</option>
                  <option value={2}>Moto</option>
                  <option value={3}>Caminhão</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="brand">Marca</label>
                <input
                  type="text"
                  {...register('brand')}
                  className="w-full"
                  id="brand"
                  required
                  defaultValue={formData?.brand || ''}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="model">Modelo</label>
                <input
                  type="text"
                  {...register('model')}
                  required
                  className="w-full"
                  id="model"
                  defaultValue={formData?.model || ''}
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
                  defaultValue={formData?.licensePlate || ''}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fueltype">Tipo de combustivel</label>
                <input
                  type="text"
                  {...register('fueltype')}
                  required
                  className="w-full"
                  id="fueltype"
                  defaultValue={formData?.fueltype || ''}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="hodometro">Hodometro</label>
                <input
                  type="Number"
                  {...register('hodometro')}
                  required
                  className="w-full"
                  id="hodometro"
                  defaultValue={formData?.hodometro || ''}
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
                  defaultValue={formData?.color || ''}
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
                  defaultValue={formData?.year || ''}
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
                  defaultValue={formData?.chassis || ''}
                />
              </div>
              <div className="mb-4">
                <button type="submit" className="primary-button">
                  Editar
                </button>
              </div>
            </form>
          </AdminLayout>
        )
      ) : (
        ''
      )}
    </div>
  );
};

EditVehicle.auth = { adminOnly: true };
export default EditVehicle;
