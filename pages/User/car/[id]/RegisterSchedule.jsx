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
const RegisterSchedule = () => {
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [status, setStatus] = useState(false);
  const { data: session } = useSession();
  const { query } = useRouter();
  const [selectedPartId, setSelectedPartId] = useState([]);
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
      formData.isReocurrent = isRecurrent;
      formData.status = status;
      formData.partId = selectedPartId;
      formData.carId = carId;
      console.log(formData);
      const result = await axios.post('/api/Schedule', formData);
      toast.success('Agendamento criada com sucesso');
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
          <h1 className="mb-4 text-xl">Registrar Revisão</h1>
          <div className="mb-4">
            <label htmlFor="title">Título</label>
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
          {car.parts && (
            <div className="mb-4 h-36 overflow-scroll">
              <label>Partes</label>
              <div className="grid grid-cols-4">
                {car.parts.map((part) => (
                  <div key={part._id} className="mb-2 flex items-center">
                    <input
                      type="checkbox"
                      id={part._id}
                      value={part._id}
                      checked={selectedPartId.includes(part._id)}
                      onChange={(e) => {
                        const partId = e.target.value;
                        setSelectedPartId((prevIds) => {
                          if (prevIds.includes(partId)) {
                            return prevIds.filter((id) => id !== partId);
                          }
                          return [...prevIds, partId];
                        });
                      }}
                      className="form-checkbox h-5 w-5"
                    />
                    <label htmlFor={part._id} className="ml-2 text-gray-700">
                      {part.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="description">Descrição</label>
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
            <label htmlFor="date">Data</label>
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
            <label htmlFor="price">Preço</label>
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
          <div className="mb-2 flex items-center">
            <div className="mb-4">
              <label htmlFor="isRecurrent">Recorrente?</label>
              <input
                type="checkbox"
                checked={isRecurrent}
                onChange={(e) => setIsRecurrent(e.target.checked)}
                className={`form-checkbox h-5 w-5 ${
                  errors.isRecurrent ? 'border-red-500' : ''
                }`}
                id="isRecurrent"
              />
              {errors.isRecurrent && (
                <p className="text-red-500">{errors.isRecurrent.message}</p>
              )}
            </div>
          </div>
          <div className="mb-2 flex items-center">
            <div className="mb-4">
              <label htmlFor="isActive">Ativo?</label>
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className={`form-checkbox h-5 w-5 ${
                  errors.isActive ? 'border-red-500' : ''
                }`}
                id="isActive"
              />
              {errors.isActive && (
                <p className="text-red-500">{errors.isActive.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <button type="submit" className="primary-button">
              Registrar Agendamento
            </button>
          </div>
        </form>
      ) : (
        ' '
      )}
    </Layout>
  );
};
RegisterSchedule.auth = true;
export default RegisterSchedule;
