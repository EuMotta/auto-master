/* eslint-disable no-param-reassign */
import MaintenanceData from '../../../models/Maintenance';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  await db.connect();
  console.log(req.body);

  const newMaintenance = new MaintenanceData({
    carId: req.body.carId,
    partId: req.body.partId,
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
  });
  const maintenance = await newMaintenance.save();
  await db.disconnect();
  res.send({ message: 'Maintenance added successfully!', maintenance });
};

const getHandler = async (req, res) => {
  await db.connect();
  const maintenance = await MaintenanceData.find({});
  await db.disconnect();
  res.send(maintenance);
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
