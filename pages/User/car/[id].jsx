/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */

'use client';

import axios from 'axios';
import { useRouter } from 'next/router';
import { React, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getError } from '@/utils/error';
import Layout from '@/components/Layout';
import db from '@/utils/db';
import Car from '@/models/Car';

export async function getStaticPaths() {
  await db.connect();
  const cars = await Car.find({}, '_id');
  await db.disconnect();

  const paths = cars.map((car) => ({
    params: { id: car._id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  await db.connect();
  const car = await Car.findById(params.id);
  await db.disconnect();

  return {
    props: {
      car: JSON.parse(JSON.stringify(car)),
    },
    revalidate: 1,
  };
}

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
  const { status, data: session } = useSession();
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
      {status === 'loading' ? (
        <span className="loading loading-bars loading-xs" />
      ) : session?.user?._id === car?.owner ? (
        <div className="container mx-auto paddings">
          {loading ? (
            <div className="text-lg text-gray-600">Carregando...</div>
          ) : error ? (
            <div className="text-lg text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h1 className="text-center mb-4 col-span-2">{`ID: ${carId}`}</h1>
              <div className="card grid prose  md:prose-xl grid-cols-2 gap-10 flex-col bg-base-300 p-5">
                <h2 className=" text-center mb-2 col-span-2">
                  Informações do carro
                </h2>
                <div className="">
                  <div className="bg-base-200 p-5">
                    <div className="flex justify-between items-center mb-1">
                      Marca: <div>{car.brand}</div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      Modelo: <div>{car.model}</div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      Combustível: <div>{car.fueltype}</div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      Hodômetro: <div>{car.hodometro}</div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="bg-base-200 p-5">
                    <div className="flex justify-between items-center mb-1">
                      Cor: <div>{car.color}</div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      Ano: <div>{car.year}</div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      Placa: <div>{car.licensePlate}</div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      Chassi: <div>{car.chassis}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card prose  md:prose-xl bg-base-300 p-5">
                <h2 className=" text-center mb-2 col-span-2">
                  Peças adicionais
                </h2>
                <div className="">
                  <div className="bg-base-200 p-5">
                    {car.test.map((item, index) => (
                      <div key={index}>
                        <h4>{item.title}</h4>
                        <ul>
                          {item.options.map((option, optionIndex) => (
                            <li key={optionIndex}>
                              <span>{option.title}: </span>
                              <span>{option.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-center">
          Você não tem permissão para visualizar este veículo.{' '}
          {session.user.name}
        </h1>
      )}
    </Layout>
  );
};

ViewCar.auth = true;

export default ViewCar;
