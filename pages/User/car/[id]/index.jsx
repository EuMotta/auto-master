/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */

'use client';

import axios from 'axios';
import { useRouter } from 'next/router';
import { React, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AiFillCar } from 'react-icons/ai';
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
        const partsRequest = axios.get(`/api/car/${carId}/parts`);
        const refuelsRequest = axios.get(`/api/car/${carId}/refuels`);
        const maintenancesRequest = axios.get(`/api/car/${carId}/maintenances`);
        const reviewsRequest = axios.get(`/api/car/${carId}/reviews`);
        const [parts, refuels, maintenances, reviews] = await Promise.all([
          partsRequest,
          refuelsRequest,
          maintenancesRequest,
          reviewsRequest,
        ]);
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
        <div className="flex items-center justify-center">
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
                  <div className="container mx-auto lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <figure className="flex justify-center">
                        {car.image ? (
                          <Image
                            src={car.image}
                            width={500}
                            height={113}
                            className="object-contain"
                          />
                        ) : (
                          <div>
                            {car.type === 1 && (
                              <AiFillCar className="text-8xl" />
                            )}
                            {car.type === 2 && (
                              <RiMotorbikeLine className="text-8xl" />
                            )}
                            {car.type === 3 && <BsTruck className="text-8xl" />}
                          </div>
                        )}
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
                </div>
                <ShowPart
                  data={car}
                  carId={carId}
                  deletePartHandler={deletePartHandler}
                />
                <ShowMaintenance
                  data={car}
                  carId={carId}
                  deleteMaintenanceHandler={deleteMaintenanceHandler}
                  formatDate={formatDate}
                />
                <ShowReview
                  data={car}
                  carId={carId}
                  deleteReviewHandler={deleteReviewHandler}
                  formatDate={formatDate}
                />
                <ShowRefuel
                  data={car}
                  carId={carId}
                  deleteRefuelHandler={deleteRefuelHandler}
                  formatDate={formatDate}
                />
              </div>
              <button type="button" onClick={deleteCarHandler}>
                Deletar Veículo
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

CarScreen.auth = true;

export default CarScreen;
