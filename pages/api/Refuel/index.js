/* eslint-disable no-param-reassign */
import RefuelData from '../../../models/Refuel';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  await db.connect();
  console.log(req.body);

  const newRefuel = new RefuelData({
    carId: req.body.carId,
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    quantity: req.body.quantity,
    local: req.body.local,
    date: req.body.date,
    price: req.body.price,
  });
  const refuel = await newRefuel.save();
  await db.disconnect();
  res.send({ message: 'Refuel added successfully!', refuel });
};

const getHandler = async (req, res) => {
  await db.connect();
  const refuel = await RefuelData.find({});
  await db.disconnect();
  res.send(refuel);
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
