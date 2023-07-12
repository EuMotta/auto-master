/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */

'use client';

import axios from 'axios';
import { useRouter } from 'next/router';
import { React, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { getError } from '@/utils/error';
import Layout from '@/components/Layout';
import db from '@/utils/db';
import Car from '@/models/Car';
import Link from 'next/link';

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
        let { data } = await axios.get(`/api/car/${carId}`);
        data.parts = await axios.get(`/api/car/${carId}/parts`);
        data.parts = data.parts.data;
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchCar();

    console.log('carro', car);
  }, []);

  return (
    <Layout title="Exibindo Carro">
      {status === 'loading' ? (
        <span className="loading loading-bars loading-xs" />
      ) : session?.user?._id === car?.owner ? (
        <div>
          {loading ? (
            <div className="text-lg text-gray-600">Carregando...</div>
          ) : error ? (
            <div className="text-lg text-red-600">{error}</div>
          ) : (
            <div>
              <div>
                <div className="bg-primary py-40">
                  <div className="container mx-auto lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <figure className="flex justify-center">
                        <Image
                          src={car.image}
                          width={500}
                          height={113}
                          className=" rounded-box"
                        />
                      </figure>
                    </div>
                    <div className="prose md:prose-xl items-center mx-auto flex-col my-auto">
                      <h2 className="text-center block !mb-0">
                        {car.licensePlate}
                      </h2>
                      <h5 className="text-center text-yellow-300">
                        {car.model}
                      </h5>
                      <hr className="!my-0" />
                      <hr className="!m-2" />
                    </div>
                  </div>
                </div>
                <div className="h-96">
                  <div
                    className="container bg-white mx-auto p-20 rounded-box mt-[-6rem]"
                    id="containerCarro"
                  >
                    <p className="text-black">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eius nihil reprehenderit dolorum exercitationem, inventore
                      excepturi quis iure cumque suscipit expedita nostrum quae
                      veritatis, in necessitatibus repellendus? Voluptas porro
                      facere adipisci?

                    </p>
                    <Link href={`${car._id}/RegisterPart`} className='btn'>Adicionar Parte</Link>
                    {car.parts.map((part) => <h1 className='text-red-900 prose'>{part.title}</h1>)}
                  </div>
                </div>
              </div>
              <div className="grid container mx-auto grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card grid prose  md:prose-xl grid-cols-2 gap-10 flex-col bg-base-300 p-5">
                  <h2 className=" text-center !m-0 col-span-2">
                    Informações do carro
                  </h2>
                  <p className="text-center !m-0 col-span-2">{`ID: ${carId}`}</p>
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
                      </div>{' '}
                    </div>
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
