/* eslint-disable no-use-before-define */
import { getSession } from 'next-auth/react';
import Review from '../../../../models/Review';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  }
  if (req.method === 'PUT') {
    return putHandler(req, res);
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'Acesse a sua conta' });
  }
  await db.connect();
  const { id } = req.query;
  console.log('id: ', id);
  try {
    const review = await Review.findById(id);
    await db.disconnect();
    res.send(review);
  } catch (error) {
    console.error('Ocorreu um erro na busca da revisão:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar a revisão' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DA REVISÃO: ${id}`);

  const review = await Review.findById(id);
  console.log(review);
  if (review) {
    await Review.deleteOne({ _id: id });
    await db.disconnect();
    res.send({ message: 'Revisão deletada.' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Revisão não encontrada.' });
  }
};

const putHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DA MANUTENÇÃO: ${id}`);
  try {
    await Review.updateOne(
      { _id: id },
      {
        carId: req.body.carId,
        total: req.body.total,
        partId: req.body.partId,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        date: req.body.date,
        price: req.body.price,
      },
    );

    await db.disconnect();
    res.send({ message: 'Manutenção editada.' });
  } catch (e) {
    await db.disconnect();
    res.status(404).send({ message: 'Manutenção não encontrada.' });
  }
};

export default handler;
