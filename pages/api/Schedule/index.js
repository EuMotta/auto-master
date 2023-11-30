import ScheduleData from '../../../models/Schedule';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  await db.connect();
  console.log(req.body);

  const newSchedule = new ScheduleData({
    carId: req.body.carId,
    partId: req.body.partId,
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    price: req.body.price,
    isReocurrent: req.body.isReocurrent,
    status: req.body.status,
  });
  const schedule = await newSchedule.save();
  await db.disconnect();
  res.send({ message: 'Schedule added successfully!', schedule });
};

const getHandler = async (req, res) => {
  await db.connect();
  const schedule = await ScheduleData.find({});
  await db.disconnect();
  res.send(schedule);
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
