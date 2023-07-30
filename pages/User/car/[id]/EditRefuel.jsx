/* eslint-disable no-unused-expressions */
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

const EditReview = () => {
  const router = useRouter();
  const { id: carId, refuelId } = router.query;
  const { data: session } = useSession();
  const [, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const [refuelData, setRefuelData] = useState({});
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(errors);

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });

        const { data } = await axios.get(`/api/Refuel/${refuelId}`);
        setRefuelData(data);
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchPartData();
  }, [refuelId, carId]);

  const submitHandler = async (formData) => {
    try {
      formData.carId = carId;
      console.log(formData);
      dispatch({ type: 'UPDATE_REQUEST' });
      const result = await axios.put(`/api/Refuel/${refuelId}`, formData);
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Abastecimento atualizado com sucesso');
      console.log(result);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/User/car/${carId}`);
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };
  console.log(refuelData);
  /*   type: { type: String, required: true },
  quantity: { type: Number, required: true },
  local: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true }, */
  return (
    <Layout title="Editar Abastecimento">
      {session?.user ? (
        <form
          className="mx-auto max-w-screen-md bg-base-500"
          onSubmit={handleSubmit(submitHandler)}
        >
          {refuelId}
          <h1 className="mb-4 text-xl">Editar Revisão</h1>
          <div className="mb-4">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              {...register('title')}
              defaultValue={refuelData.title}
              className="w-full"
              id="title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              {...register('description')}
              defaultValue={refuelData.description}
              className="w-full"
              id="description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type">Tipo</label>
            <input
              type="text"
              {...register('type')}
              defaultValue={refuelData.type}
              className="w-full"
              id="type"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="distance">Distância percorrida</label>
            <input
              type="text"
              {...register('distance')}
              defaultValue={refuelData.distance}
              className="w-full"
              id="distance"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity">Quantidade</label>
            <input
              type="Number"
              {...register('quantity')}
              defaultValue={refuelData.quantity}
              className="w-full"
              id="quantity"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date">Data</label>
            <input
              type="Date"
              {...register('date')}
              defaultValue={refuelData.date}
              className="w-full"
              id="date"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price">Preço</label>
            <input
              type="Number"
              {...register('price')}
              defaultValue={refuelData.price}
              className="w-full"
              id="price"
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="primary-button">
              Editar
            </button>
          </div>
        </form>
      ) : (
        ' '
      )}
    </Layout>
  );
};

EditReview.auth = true;
export default EditReview;
