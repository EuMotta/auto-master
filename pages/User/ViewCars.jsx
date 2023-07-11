/* eslint-disable no-unused-expressions */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';

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

const ViewCars = () => {
  const { status, data: session } = useSession();
  const [cars, setCars] = useState([]);

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    car: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?._id) {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const result = await fetch(`/api/car?model=${session.user._id}`);
          const data = await result.json();

          const filteredCars = data.filter(
            (car) => car.owner === session.user._id,
          );

          dispatch({ type: 'FETCH_SUCCESS', payload: filteredCars });
          setCars(filteredCars);
        } catch (err) {
          dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
        }
      }
    };

    fetchData();
  }, [session]);

  return (
    <Layout>
      <div className="container mx-auto">
        {status === 'loading' ? (
          <span className="loading loading-bars loading-xs" />
        ) : loading ? (
          <div className="text-lg text-gray-600">Carregando...</div>
        ) : error ? (
          <div className="text-lg text-red-600">{error}</div>
        ) : (
          <div className="flex gap-5 flex-wrap">
            {cars.map((car, index) => (
              <div key={index} className="card w-96 bg-base-200 shadow-xl">
                <figure>imagem</figure>
                <div className="card-body prose md:prose-xl">
                  <div className="text-center">
                    <p>{session.user._id}</p>
                    {car.owner}
                    <h4>
                      {car.brand} {car.model}
                    </h4>
                    <div className="bg-base-300">
                      <p>{car.licensePlate}</p>
                    </div>
                    <div className="card-actions justify-end">
                      <Link
                        href={`/User/car/${car._id}`}
                        type="button"
                        className="btn"
                      >
                        Ver Carro
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ViewCars;
