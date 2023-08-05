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
const EditUser = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { userId } = router.query;
  const [formData, setFormData] = useState({});
  const [userCars, setUserCars] = useState([]);
  const [loading, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      console.log(userId);
      try {
        const { data } = await axios.get(`/api/admin/user/${userId}`);
        const userCars = (await axios.get(`/api/car/?externalUserId=${userId}`)).data;
        dispatch({ type: 'FETCH_REQUEST' });
        console.log(data);
        setFormData(data[0]);
        setUserCars(userCars);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day < 10 ? '0' : ''}${day}/${
      month < 10 ? '0' : ''
    }${month}/${year} as ${hours}:${minutes}`;
  };
  return (
    <div className="">
      {!loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : error ? (
        <div className="text-lg text-red-600">{error}</div>
      ) : (
        <AdminLayout>
          <div className="grid grid-cols-2">
            <div className="prose md:prose-lg">
              <div className="card shadow-lg compact side bg-base-200">
                <div className="grid grid-cols-2">
                  <div className="">
                    <div className="flex-row items-center space-x-4 card-body">
                      <div>
                        <h2 className="card-title">
                          {formData.name} {formData.lastName}
                        </h2>
                        <p>{formData.email}</p>
                        <div className="badge badge-secondary mt-2">
                          {formData.isAdmin ? 'Admin' : 'User'}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Nome:</strong> {formData.name}
                      </p>
                      <p>
                        <strong>Sobrenome:</strong> {formData.lastName}
                      </p>
                      <p>
                        <strong>email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>id:</strong> {formData._id}
                      </p>
                      <p>
                        <strong>Criada:</strong>{' '}
                        {formatDate(formData.createdAt)}
                      </p>
                      <p>
                        <strong>Atualizada:</strong>{' '}
                        {formatDate(formData.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

            <div className="car-list">
              {userCars.map((car, key) => (
                <h1 key={key}>{car.licensePlate}</h1>
              ))}
            </div>
          </div>
        </AdminLayout>
      )}
    </div>
  );
};

EditUser.auth = { adminOnly: true };
export default EditUser;
