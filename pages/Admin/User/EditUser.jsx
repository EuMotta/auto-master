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
      state;
  }
}
const ViewCars = () => {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { userId } = router.query;
  const [formData, setFormData] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      console.log(userId);
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/user/${userId}`);
        setFormData(data[0]);
        setLoading(false);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
        setLoading(false);
        setError(getError(err));
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (formData) => {
    try {
      await axios.put(`/api/admin/user/${userId}`, formData);
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
              <h1 className="mb-4 text-xl">Edite suas informações</h1>
              <div className="mb-4">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full"
                  id="name"
                  required
                  defaultValue={formData?.name || ''}
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
                  defaultValue={formData?.lastName || ''}
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
                  defaultValue={formData?.email || ''}
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

ViewCars.auth = { adminOnly: true };
export default ViewCars;
