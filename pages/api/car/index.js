import Car from '../../../models/Car';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  await db.connect();
  const newCar = new Car({
    ...req.body,
  });
  const car = await newCar.save();
  await db.disconnect();
  res.send({ message: 'Car added successfully!', car });
};

const getHandler = async (req, res) => {
  await db.connect();
  const car = await Car.find({});
  await db.disconnect();
  res.send(car);
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } if (req.method === 'POST') {
    return postHandler(req, res);
  }
  return res.status(400).send({ message: 'Deu ruim!' });
};

export default handler;