/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */

'use client';

import axios from 'axios';
import { useRouter } from 'next/router';
import { React, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { BsPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';
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

const ViewCar = () => {
  const { query } = useRouter();
  const { status, data: session } = useSession();
  const carId = query.id;
  const router = useRouter();

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
        data.parts = await axios.get(`/api/car/${carId}/parts`);
        data.parts = data.parts.data;
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchCar();
  }, []);

  const deleteCarHandler = async () => {
    if (!window.confirm('Você tem certeza?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      console.log(carId);
      await axios.delete(`/api/car/${carId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Carro deletado.');
      router.push('/User/ViewCars');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
    }
  };
  const deletePartHandler = async () => {
    if (!window.confirm('Você tem certeza?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      const partId = car.parts[0]._id;
      await axios.delete(`/api/Part/${partId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Parte deletada.');
      window.location.reload();
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
    }
  };
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
                          className="rounded-box"
                          alt="carro"
                          style={{ width: 'auto', height: 'auto' }}
                          unoptimized
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
                <div className="card prose h-96 overflow-scroll md:prose-xl flex-col bg-base-200 p-5">
                  <h2 className=" text-center !m-0 col-span-2">Peças</h2>
                  <div className="items-end" />
                  <div className="overflow-x-auto">
                    <div className="table prose  md:prose-lg">
                      <div>
                        <div className="grid text-center grid-cols-3">
                          <div>Nome</div>
                          <div>Descrição</div>
                          <div>Preço</div>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col gap-5 ">
                          {car.parts.map((part, index) => (
                            <div
                              key={index}
                              className="collapse collapse-arrow shadow-lg shadow-base-300 bg-base-100"
                            >
                              <input
                                type="radio"
                                name="my-accordion-2"
                                defaultChecked
                              />
                              <div className="collapse-title text-center items-center grid grid-cols-3 !p-0 font-medium">
                                <p className="!m-0">{part.title}</p>
                                <p className="!m-0">Descrição</p>
                                <p className="!m-0">R$ {part.price}</p>
                              </div>
                              <div className="collapse-content !p-0 flex flex-col gap-2">
                                {part.options.map((option) => (
                                  <div
                                    key={option.value}
                                    className="text-center items-center grid grid-cols-3 !p-0 border-b"
                                  >
                                    <p className="!m-0">{option.title}</p>
                                    <p className="!m-0">{option.value}</p>
                                  </div>
                                ))}
                              </div>
                              <button type="button" onClick={deletePartHandler}>
                                Deletar essa maçã
                              </button>
                            </div>
                          ))}
                          <Link
                            href={`${car._id}/RegisterPart`}
                            className="text-3xl font btn btn-primary !p-2"
                          >
                            <BsPlus />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" onClick={deleteCarHandler}>
                Deletar Carro
              </button>
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
