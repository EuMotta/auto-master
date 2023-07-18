/* eslint-disable no-unused-expressions */
import React, { useEffect, useReducer, useState } from 'react';
import { useSession } from 'next-auth/react';
import AdminLayout from './components/AdminLayout';
import { getError } from '@/utils/error';
import Graph1 from './components/Graphics';

const ViewCars = () => {
  const { status, data: session } = useSession();
  const [cars, setCars] = useState([]);
  function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, cars: action.payload, error: '' };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    car: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await fetch('/api/car');
        const data = await result.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setCars(data);
        console.log(data);
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="">
        {session.user.isAdmin ? (
          status === 'loading' ? ( // Added parentheses around status === 'loading'
            <span className="loading loading-bars loading-xs" />
          ) : loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-bars loading-lg" />
            </div>
          ) : error ? (
            <div className="text-lg text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-3">
              <div className="card p-5 w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="text-center">Carros criados</h2>
                </div>
                <figure>
                  <Graph1 cars={cars} />
                </figure>
              </div>
            </div>
          )
        ) : (
          ''
        )}
      </div>
    </AdminLayout>
  );
};

ViewCars.auth = { adminOnly: true };
export default ViewCars;
