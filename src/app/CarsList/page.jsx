'use client';

import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Page = () => {
  const [cars, setCars] = useState([]);

  useEffect(async () => {
    const data = await fetch('/api/cars');
    const carList = await data.json();
    setCars(carList);
  }, []);

  return (
    <main>
      <h1>Carros: </h1>
      {cars.map((car, key) => (
        <h2 key={key}>{car.car_name}</h2>
      ))}
    </main>
  );
};

export default Page;
