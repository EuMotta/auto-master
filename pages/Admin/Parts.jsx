/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import { BsInfoCircle } from 'react-icons/bs';
import AdminLayout from './components/AdminLayout';
import { getError } from '@/utils/error';

const Parts = () => {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [partData, setPartData] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async (page) => {
    setLoading(true);
    setError('');
    try {
      const partDataResponse = await axios.get(`/api/admin/part?pag=${page}`);
      const partData = await partDataResponse.data.parts;
      const pages = await partDataResponse.data.pages;
      setPartData(partData);
      setLoading(false);
      setPages(pages);
    } catch (err) {
      setError(getError(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);
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
    <div className="">
      {session.user?.isAdmin ? (
        status === 'loading' ? (
          <span className="loading loading-bars loading-xs" />
        ) : loading ? (
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
                    {partData.map((part, key) => (
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
                              <p className="text-sm" title={part.carId}>
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
                <div className="flex justify-center items-center mt-5">
                  <div className="join">
                    {Array.from(
                      { length: 5 },
                      (_, index) => currentPage - 2 + index,
                    ).map(
                      (page) => page >= 0 &&
                        page < pages && (
                          <button
                            key={page}
                            type="button"
                            className={`join-item btn ${
                              page === currentPage ? 'btn-active' : ''
                            }`}
                            onClick={() => {
                              fetchData(page);
                              setCurrentPage(page);
                            }}
                          >
                            {page + 1}
                          </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AdminLayout>
        )
      ) : (
        ''
      )}
    </div>
  );
};

Parts.auth = { adminOnly: true };
export default Parts;
