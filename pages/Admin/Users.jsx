'use client';

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
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Users = () => {
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    users: [],
    error: '',
  });
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/admin/user');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setPages(pages);
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchData();
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
    <AdminLayout>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : error ? (
        <div className="text-lg text-red-600">{error}</div>
      ) : (
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
                {users.map((user, key) => (
                  <tr
                    key={key}
                    className="hover:bg-base-200 transition-all hover:-translate-y-1 hover:shadow-sm"
                  >
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">
                            {user.name} {user.lastName}
                          </div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Criada: {formatDate(user.createdAt)}
                      <br />
                      Atualizada: {formatDate(user.updatedAt)}
                    </td>
                    <td>
                      {user.isAdmin ? (
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
                      <Link href={`/Admin/User/EditUser?userId=${user._id}`}>
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
                {/* Array.from(
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
                    ) */}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

Users.auth = { adminOnly: true };
export default Users;
