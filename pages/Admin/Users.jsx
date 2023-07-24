/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import AdminLayout from './components/AdminLayout';
import { getError } from '@/utils/error';
import Graph1 from './components/Graphics';

const ViewCars = () => {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const [pag, setPag] = useState(0);
  const [pages, setPages] = useState(0);

  const fetchData = async (page) => {
    setLoading(true);
    setError('');
    try {
      setPag(page);
      const userDataResponse = await axios.get(`/api/admin/user?pag=${pag}`);
      const userData = userDataResponse.data.users;
      const pages = userDataResponse.data.pages;
      setUserData(userData);
      setLoading(false);
      setPages(pages);
    } catch (err) {
      setError(getError(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <div className="container mx-auto">
              <div className="overflow-x-auto">
                <table className="table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((usuario, key) => {
                      return (
                        <tr>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div>
                                <div className="font-bold">{usuario.name}</div>
                                <div className="text-sm opacity-50">United States</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            Zemlak, Daniel and Leannon
                            <br />
                            <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                          </td>
                          <td>Purple</td>
                          <th>
                            <button className="btn btn-ghost btn-xs">details</button>
                          </th>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
                <div className="join">
                  <button className="join-item btn">1</button>
                  <button className="join-item btn btn-active">2</button>
                  <button className="join-item btn">3</button>
                  <button className="join-item btn">4</button>
                </div>
                <button type="button" onClick={() => {
                  fetchData(3);
                }}>{pages}</button>
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
