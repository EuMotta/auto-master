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

const Profile = () => {
  const { query } = useRouter();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session.user._id;
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
      console.log(userId);

      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/User/${userId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setFormData(data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (formData) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/User/${userId}`, formData);
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Informações Atualizadas.');
      router.push('/User/ViewCars');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <form
        className="mx-auto max-w-screen-md bg-base-500"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Edite suas informações</h1>
        <div className="mb-4">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            {...register('name')}
            className="w-full"
            id="name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName">Sobrenome</label>
          <input
            type="text"
            {...register('lastName')}
            required
            className="w-full"
            id="lastName"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            {...register('email')}
            required
            className="w-full"
            id="email"
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="primary-button">
            Editar
          </button>
        </div>
      </form>
    </Layout>
  );
};
Profile.auth = true;
export default Profile;
