/* eslint-disable no-unused-expressions */
import { getSession } from 'next-auth/react';
import CarData from '../../../models/Car';
import db from '../../../utils/db';

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
    type: req.body.type,
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
  const { user } = session;
  const { externalUserId } = req.query;
  if (externalUserId && user.isAdmin) {
    console.log(externalUserId);
    await db.connect();
    const car = await CarData.find({ owner: externalUserId });
    await db.disconnect();
    res.send(car);
  } else {
    console.log(user._id);
    await db.connect();
    const car = await CarData.find({ owner: user._id });
    await db.disconnect();
    res.send(car);
  }
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
