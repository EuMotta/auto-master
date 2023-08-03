/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import AdminLayout from './components/AdminLayout';
import { getError } from '@/utils/error';
import Graph1 from './components/Graphics';

const Dashboard = () => {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [carData, setCarData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [partCount, setPartCount] = useState(0);
  const [maintenanceCount, setMaintenanceCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [carDataResponse, summaryDataResponse] = await Promise.all([
          axios.get('/api/admin/car'),
          axios.get('/api/admin/summary'),
        ]);
        const carData = carDataResponse.data;

        const uniqueBrands = [...new Set(carData.map((car) => car.brand))];

        const brandCounts = await Promise.all(
          uniqueBrands.map(async (brand) => {
            const carDataResponse = await axios.get(
              `/api/admin/car?brand=${brand}`,
            );
            return { brand, count: carDataResponse.data.length };
          }),
        );

        const chartData = brandCounts.map(({ brand, count }) => ({
          name: brand,
          value: count,
        }));
        setCarData(chartData);
        setUsersCount(summaryDataResponse.data.usersCount);
        setCarCount(summaryDataResponse.data.carCount);
        setPartCount(summaryDataResponse.data.partCount);
        setMaintenanceCount(summaryDataResponse.data.maintenanceCount);
        setLoading(false);
      } catch (err) {
        setError(getError(err));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardmap = [
    {
      title: 'Usuários cadastrados',
      value: usersCount,
      link: '/',
    },
    {
      title: 'Carros Registrados',
      value: carCount,
      link: '/',
    },
    {
      title: 'Manutenções registradas',
      value: maintenanceCount,
      link: '/',
    },
    {
      title: 'Peças registradas',
      value: partCount,
      link: '/',
    },
  ];
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
              <div className="grid grid-cols-4 yPaddings gap-5">
                {cardmap.map((item, index) => (
                  <div
                    key={index}
                    className="card w-full  !rounded-sm flex justify-center items-center bg-base-100 shadow-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{item.title}</h2>
                      <p>{item.value}</p>
                      <div className="card-actions justify-end">
                        <Link href="/" className="">
                          Ver todos
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3">
                <div className="card w-96 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Carros por marca</h2>
                    <p>Quantidade de carros de acordo com a sua marca</p>
                  </div>
                  <figure>
                    <Graph1 data={carData} />
                  </figure>
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

Dashboard.auth = { adminOnly: true };
export default Dashboard;
