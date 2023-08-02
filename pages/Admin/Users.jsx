/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import { BsInfoCircle } from 'react-icons/bs';
import Cookies from 'js-cookie';
import AdminLayout from './components/AdminLayout';
import { getError } from '@/utils/error';
import db from '@/utils/db';
import User from '@/models/User';

export async function getStaticPaths() {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  Cookies.remove('session');
  console.log(Cookies);
  const paths = users.map((user) => ({
    params: { id: user._id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  await db.connect();
  const user = await User.findById(params.id);
  await db.disconnect();

  return {
    props: {
      car: JSON.parse(JSON.stringify(user)),
    },
    revalidate: 1,
  };
}

const ViewCars = () => {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchData = async (page) => {
    setLoading(true);
    setError('');
    try {
      const userDataResponse = await axios.get(`/api/admin/user?pag=${page}`);
      const userData = await userDataResponse.data.users;
      const pages = await userDataResponse.data.pages;
      setUserData(userData);
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
            <div className="container yPaddings mx-auto">
              <div>
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th className="flex justify-center">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody className="max-h-96 overflow-y-scroll">
                    {userData.map((usuario, key) => (
                      <tr
                        key={key}
                        className="hover:bg-base-200 transition-all hover:-translate-y-1 hover:shadow-sm"
                      >
                        <td>
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">
                                {usuario.name} {usuario.lastName}
                              </div>
                              <div className="text-sm opacity-50">
                                {usuario.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          Criada: {formatDate(usuario.createdAt)}
                          <br />
                          Atualizada: {formatDate(usuario.updatedAt)}
                        </td>
                        <td>
                          {usuario.isAdmin ? (
                            <span className="badge badge-error badge-sm">
                              Admin
                            </span>
                          ) : (
                            <span className="badge badge-success badge-sm">
                              Usuário
                            </span>
                          )}
                        </td>
                        <th className="flex justify-center">
                          <Link href={`/Admin/User/EditUser?userId=${usuario._id}`}>
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
                <div className="flex justify-center items-center">
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

ViewCars.auth = { adminOnly: true };
export default ViewCars;
