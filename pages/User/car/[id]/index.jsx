/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */

'use client';

import axios from 'axios';
import { useRouter } from 'next/router';
import { React, useReducer, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AiFillCar, AiFillDelete } from 'react-icons/ai';
import { RiMotorbikeLine } from 'react-icons/ri';
import { BsTruck } from 'react-icons/bs';
import { getError } from '@/utils/error';
import Layout from '@/components/Layout';
import db from '@/utils/db';
import Car from '@/models/Car';
import ShowPart from '@/pages/sections/User/car/index/ShowPart';
import ShowMaintenance from '@/pages/sections/User/car/index/ShowMaintenance';
import ShowReview from '@/pages/sections/User/car/index/ShowReview';
import ShowRefuel from '@/pages/sections/User/car/index/ShowRefuel';
import ShowSchedule from '@/pages/sections/User/car/index/ShowSchedule';

export async function getStaticPaths() {
  await db.connect();
  const cars = await Car.find({}, '_id');
  await db.disconnect();
  Cookies.remove('session');
  console.log(Cookies);
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

const CarScreen = () => {
  const { query } = useRouter();
  const carId = query.id;
  const router = useRouter();
  const { data: session } = useSession();
  const [modal, setModal] = useState(1);
  const [{ loading, error, car }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    car: {},
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const carRequest = axios.get(`/api/car/${carId}`);
        const partsRequest = axios.get(`/api/car/${carId}/parts`);
        const refuelsRequest = axios.get(`/api/car/${carId}/refuels`);
        const maintenancesRequest = axios.get(`/api/car/${carId}/maintenances`);
        const reviewsRequest = axios.get(`/api/car/${carId}/reviews`);
        const [car, parts, refuels, maintenances, reviews] = await Promise.all([
          carRequest,
          partsRequest,
          refuelsRequest,
          maintenancesRequest,
          reviewsRequest,
        ]);
        const { data } = car;
        data.parts = parts.data;
        data.refuels = refuels.data;
        data.maintenances = maintenances.data;
        data.reviews = reviews.data;
        data.maintenances = await data.maintenances.map((maintenance) => ({
          ...maintenance,
          partTitle:
            data.parts.find((part) => part._id === maintenance.partId)?.title ||
            'Peça não encontrada',
        }));

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchCar();
  }, [carId]);

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
    Cookies.remove('session');
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
  const deleteMaintenanceHandler = async () => {
    Cookies.remove('session');
    if (!window.confirm('Você tem certeza?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      const maintenanceId = car.maintenances[0]._id;
      await axios.delete(`/api/Maintenance/${maintenanceId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Parte deletada.');
      window.location.reload();
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
    }
  };
  const deleteReviewHandler = async () => {
    Cookies.remove('session');
    if (!window.confirm('Você tem certeza?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      const reviewId = car.reviews[0]._id;
      await axios.delete(`/api/Review/${reviewId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Revisão deletada.');
      window.location.reload();
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
    }
  };
  const deleteRefuelHandler = async () => {
    Cookies.remove('session');
    if (!window.confirm('Você tem certeza?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      const refuelId = car.refuels[0]._id;
      await axios.delete(`/api/Refuel/${refuelId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Abastecimento deletado.');
      window.location.reload();
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${
      month < 10 ? '0' : ''
    }${month}/${year}`;
  };
  return (
    <Layout title="Exibindo Carro">
      {loading ? (
        <div className="flex items-center h-screen justify-center">
          <span className="loading loading-bars loading-xl" />
        </div>
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
                  <div className="container mx-auto lg:px-20  grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-2">
                      <div>
                        <figure className="flex justify-center">
                          {car.image ? (
                            <Image
                              src={car.image}
                              width={500}
                              height={113}
                              className="object-contain rounded-3xl"
                            />
                          ) : (
                            <div>
                              {car.type === 1 && (
                                <AiFillCar className="text-8xl" />
                              )}
                              {car.type === 2 && (
                                <RiMotorbikeLine className="text-8xl" />
                              )}
                              {car.type === 3 && (
                                <BsTruck className="text-8xl" />
                              )}
                            </div>
                          )}
                        </figure>
                      </div>
                      <div className="prose md:prose-xl items-center justify-between mx-auto flex-col my-auto">
                        <h2 className="text-center block !mb-0">
                          {car.brand} {car.model}
                        </h2>
                        <h4>Placa: {car.licensePlate}</h4>
                        <h4>Cor: {car.color}</h4>
                        <h4>
                          Tipo:{' '}
                          {car.type === 1
                            ? 'Carro'
                            : car.type === 2
                              ? 'Moto'
                              : 'Caminhão'}
                        </h4>
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        type="button"
                        className="btn !p-2 z-10 btn-error"
                        onClick={deleteCarHandler}
                      >
                        <AiFillDelete className="md:text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-[-4rem] mb-10 bg-white container mx-auto p-5 rounded-3xl gap-10 justify-center w-3/4 items-center">
                {/* <div className="card grid prose  md:prose-xl grid-cols-2 gap-10 flex-col bg-base-300 p-5">
                  <h2 className=" text-center !m-0 col-span-2">
                    Informações do Veículo
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
                </div> */}
                <div className=" flex gap-5">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setModal(1)}
                  >
                    Partes
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setModal(2)}
                  >
                    Manutenções
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setModal(3)}
                  >
                    Revisões
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setModal(4)}
                  >
                    Abastecimentos
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setModal(5)}
                  >
                    Agendamentos
                  </button>
                </div>
                {modal === 1 ? (
                  <ShowPart
                    data={car}
                    carId={carId}
                    deletePartHandler={deletePartHandler}
                  />
                ) : modal === 2 ? (
                  <ShowMaintenance
                    data={car}
                    carId={carId}
                    deleteMaintenanceHandler={deleteMaintenanceHandler}
                    formatDate={formatDate}
                  />
                ) : modal === 3 ? (
                  <ShowReview
                    data={car}
                    carId={carId}
                    deleteReviewHandler={deleteReviewHandler}
                    formatDate={formatDate}
                  />
                ) : modal === 4 ? (
                  <ShowRefuel
                    data={car}
                    carId={carId}
                    deleteRefuelHandler={deleteRefuelHandler}
                    formatDate={formatDate}
                  />
                ) : (
                  <ShowSchedule
                    data={car}
                    carId={carId}
                    deleteRefuelHandler={deleteRefuelHandler}
                    formatDate={formatDate}
                  />
                )}
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

CarScreen.auth = true;

export default CarScreen;
