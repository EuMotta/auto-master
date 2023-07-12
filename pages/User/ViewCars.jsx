/* eslint-disable no-unused-expressions */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import imgCarro from '@/public/images/carro.jpg';
import Image from 'next/image';

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
          <div className="container mx-auto mt-24 yPaddings">
            <div className="filters w-30 mx-auto bg-base-200 p-3 justify-between items-center rounded-box flex">
              <div>
                <Link href="RegisterCar" className='btn'>Criar Veículo</Link>
                <Link href="RegisterCar" className='btn'>Criar Veículo</Link>
                <div className="dropdown">
                  <label tabIndex={0} className="btn m-1">Click</label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                  </ul>
                </div>
              </div>
              <Link href="RegisterCar" className='btn'>Criar Veículo</Link>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-5 my-5">
              {cars.map((car, index) => (
                <div key={index} className="card w-96 shadow-sm shadow-gray-600 mt-3 mx-aut">
                  <figure><Image src={imgCarro}/></figure>
                  <div className="card-body prose md:prose-xl">
                    <div className="text-center">
                      <div className="bg-base-300 rounded-md">
                        <p className='!mt-0'>{car.licensePlate}</p>
                      </div>
                      <h4>
                        {car.brand} {car.model}
                      </h4>
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
              
          </div>

        )}
      </div>
    </Layout>
  );
};

export default ViewCars;
