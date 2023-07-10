/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import axios from 'axios';
import { useRouter } from 'next/router';
import { React, useReducer, useEffect } from 'react';
import { getError } from '@/utils/error';
import Layout from '@/components/Layout';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, car: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const ViewCar = () => {
  const { query } = useRouter();

  const carId = query.id;

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
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchCar();
  }, []);

  return (
    <Layout title="Exibindo Carro">
      <div>
        <h1>{ `id: ${carId}` }</h1>
        {loading ? (
          <div>
            Carregando...
          </div>
        ) : error ? (
          <div>
            {error}
          </div>
        ) : (
          <div>
            {car.model}
            {car.brand}
            {car.headlights.brightness}
          </div>
        )}

      </div>
    </Layout>
  );
};

ViewCar.auth = true;

export default ViewCar;
