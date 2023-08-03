/* eslint-disable no-shadow */
import React, { useEffect, useReducer, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BsInfoCircle } from 'react-icons/bs';
import AdminLayout from './components/AdminLayout';
import { getError } from '@/utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, parts: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Parts = () => {
  const [{ loading, error, parts }, dispatch] = useReducer(reducer, {
    loading: true,
    parts: [],
    error: '',
  });
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/admin/part');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setPages(Math.ceil(data.length / 10));
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchData();
  }, [pages]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  };
  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : error ? (
        <div className="text-lg text-red-600">{error}</div>
      ) : (
        <AdminLayout>
          <div className="container yPaddings  mx-auto">
            <div className="flex flex-col">
              <table className="table ">
                <thead>
                  <tr className="prose md:prose-md">
                    <th>Titulo</th>
                    <th>Preço</th>
                    <th className="hidden md:table-cell">Criado</th>
                    <th className="hidden md:table-cell">Atualizado</th>
                    <th className="flex justify-center">Detalhes</th>
                  </tr>
                </thead>

                <tbody className="max-h-96 prose md:prose-md overflow-y-scroll">
                  {parts.map((part, key) => (
                    <tr
                      key={key}
                      className="hover:bg-base-200 transition-all hover:-translate-y-1 hover:shadow-sm"
                    >
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">
                              <p>{part.title}</p>
                            </div>
                            <p className="text-sm" title={part.partId}>
                              Veículo:
                              <span className="badge text-sm opacity-50">
                                {part.carId.substring(18, 24)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <p>R$ {part.price}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">
                        <p>{formatDate(part.createdAt)}</p>
                      </td>
                      <td className="hidden md:table-cell">
                        <p>{formatDate(part.updatedAt)}</p>
                      </td>
                      <th className="flex justify-center">
                        <Link href={`/Admin/Car/EditCar?partId=${part._id}`}>
                          <button
                            type="button"
                            className="text-info rounded-full !p-2"
                          >
                            <BsInfoCircle className="text-3xl" />
                          </button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AdminLayout>
      )}
    </div>
  );
};

Parts.auth = { adminOnly: true };
export default Parts;
