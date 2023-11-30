/* eslint-disable no-unused-expressions */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react';
import Image from 'next/image';
import { AiFillCar } from 'react-icons/ai';
import { RiMotorbikeLine } from 'react-icons/ri';
import { BsSearch, BsTruck } from 'react-icons/bs';
import { getError } from '@/utils/error';
import Layout from '@/components/Layout';

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
  const [selectedFilter, setSelectedFilter] = useState('');
  const [search, setSearch] = useState('');
  const [{ loading, error, cars }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    cars: [],
    filter: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?._id) {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const result = await fetch('/api/car');
          const data = await result.json();

          const filteredCars = selectedFilter
            ? data.filter((car) => car.type === parseInt(selectedFilter, 10))
            : data;

          dispatch({ type: 'FETCH_SUCCESS', payload: filteredCars });
        } catch (err) {
          dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
        }
      }
    };

    fetchData();
  }, [selectedFilter]);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setSelectedFilter(value);
  };

  return (
    <Layout title="Visualizar Veículos">
      <div className="container  mx-auto">
        <div className="container mx-auto yPaddings">
          <div className="filters w-30 top-0 mx-auto bg-primary p-3 grid grid-cols-5 gap-5 items-center rounded">
            <div className="flex justify-center col-span-3 items-center">
              <input type="text" className="w-full rounded-r-none" onChange={(e) => setSearch(e.target.value)} />
              <button
                type="button"
                className="btn-secondary rounded-l-none btn"
              > {search}
                <BsSearch className="text-4xl" />
              </button>
            </div>
            <div className="flex justify-end col-span-2 gap-3 items-center">
              <Link href="RegisterCar" className="btn btn-secondary">
                Criar Veículo
              </Link>
              <div className="p-3 rounded-lg btn-secondary">
                <label htmlFor="type">Filtrar por:</label>
                <select
                  onChange={handleFilterChange}
                  value={selectedFilter}
                  id="type"
                  className="btn-secondary"
                >
                  <option value="">Todos</option>
                  <option value={1}>Carro</option>
                  <option value={2}>Moto</option>
                  <option value={3}>Caminhão</option>
                </select>
              </div>
            </div>
          </div>
          {status === 'loading' ? (
            <span className="loading loading-bars loading-xs" />
          ) : loading ? (
            <div className="!flex !justify-center h-24 !items-center">
              <div className="prose md:prose-xl mx-10">
                <h3>Carregando veículos</h3>
              </div>
              <span className="loading loading-dots loading-lg" />
            </div>
          ) : error ? (
            <div className="text-lg text-red-600">{error}</div>
          ) : (
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-3 my-5">
              {cars.filter((car) => car.brand.toUpperCase().includes(search.toUpperCase()) || car.model.toUpperCase().includes(search.toUpperCase()) || car.licensePlate.toUpperCase().includes(search.toUpperCase()))
                .map((car, index) => (
                  <Link href={`/User/car/${car._id}`} className="mb-5">
                    <div
                      key={index}
                      className="card className='border-yellow-400 hover:translate-y-1 transition-all !rounded-sm w-72 bg-white overflow-hidden shadow-sm shadow-gray-600 mx-auto"
                    >
                      <figure className="h-40 bg-base-200">
                        {car.image ? (
                          <Image
                            src={car.image}
                            width={500}
                            height={113}
                            className="object-contain"
                          />
                        ) : (
                          <div>
                            {car.type === 1 && <AiFillCar className="text-8xl" />}
                            {car.type === 2 && (
                              <RiMotorbikeLine className="text-8xl" />
                            )}
                            {car.type === 3 && <BsTruck className="text-8xl" />}
                          </div>
                        )}
                      </figure>
                      <div className="card-body prose md:prose-xl">
                        <div className="text-center ">
                          <div className="flex flex-col gap-5">
                            <h4>
                              {car.brand} {car.model}
                            </h4>
                            <div className="bg-primary shadow-md rounded-md">
                              <p className="!mt-0">{car.licensePlate}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="flex items-center justify-center rounded-md bg-secondary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          Visualizar veículo
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

ViewCars.auth = true;
export default ViewCars;
