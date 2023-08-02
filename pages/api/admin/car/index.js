/* eslint-disable no-unused-expressions */
import { getSession } from 'next-auth/react';
import CarData from '@/models/Car';
import db from '@/utils/db';

const postHandler = async (req, res) => {
  console.log('test');
  await db.connect();
  const newCar = new CarData({
    owner: req.body.owner,
    image: req.body.image,
    brand: req.body.brand,
    model: req.body.model,
    fueltype: req.body.fueltype,
    hodometro: req.body.hodometro,
    color: req.body.color,
    year: req.body.year,
    licensePlate: req.body.licensePlate,
    chassis: req.body.chassis,
    createdAt: req.body.createdAt,
  });
  const car = await newCar.save();
  await db.disconnect();
  res.send({ message: 'Car added successfully!', car });
};

const getHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Realize o cadastro');
  }

  const { brand } = req.query;

  await db.connect();
  let cars;
  const { pag } = req.query;
  if (brand) {
    cars = await CarData.find({ brand }).select('brand');
  } else if (pag) {
    let pages = await CarData.countDocuments({}) / 20;
    pages = Math.ceil(pages);
    await db.connect();
    cars = await CarData.find({}).skip(20 * pag).limit(20);
    await db.disconnect();
    res.send({ cars, pages });
  } else {
    cars = await CarData.find({});
    const cars2 = await CarData.find({}).distinct('brand');
    await console.log(cars2);
  }

  await db.disconnect();
  res.send(cars);
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } if (req.method === 'POST') {
    return postHandler(req, res);
  }
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
