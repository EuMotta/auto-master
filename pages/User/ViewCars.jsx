import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

const ViewCars = () => {
  const { status, data: session } = useSession();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?._id) {
        const result = await fetch(`/api/car?owner=${session.user._id}`);
        const data = await result.json();

        const filteredCars = data.filter(
          (car) => car.owner === session.user._id,
        );

        setCars(filteredCars);
      }
    };

    fetchData();
  }, [session]);

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex gap-5 flex-wrap">
          {cars.map((car, index) => (
            <div key={index} className="card w-96 bg-base-200 shadow-xl">
              <figure>imagem</figure>
              <div className="card-body prose md:prose-xl">
                <div className="text-center">
                  <p>{session.user._id}</p>
                  {car.owner}
                  <h4>
                    {car.brand} {car.model}
                  </h4>
                  <div className="bg-base-300">
                    <p>{car.licensePlate}</p>
                  </div>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/User/car/${car._id}`}
                      type="button"
                      className="btn"
                    >
                      Ver Carro
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ViewCars;
