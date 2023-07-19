/* eslint-disable no-param-reassign */
import ReviewData from '../../../models/Review';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  await db.connect();
  console.log(req.body);

  const newReview = new ReviewData({
    carId: req.body.carId,
    total: req.body.total,
    partId: req.body.partId,
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
  });
  const review = await newReview.save();
  await db.disconnect();
  res.send({ message: 'Review added successfully!', review });
};

const getHandler = async (req, res) => {
  await db.connect();
  const review = await ReviewData.find({});
  await db.disconnect();
  res.send(review);
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
