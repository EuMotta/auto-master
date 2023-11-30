/* eslint-disable no-use-before-define */
import { getSession } from 'next-auth/react';
import Schedule from '../../../../models/Schedule';
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
    const schedule = await Schedule.findById(id);
    await db.disconnect();
    res.send(schedule);
  } catch (error) {
    console.error('Ocorreu um erro na busca do agendamento:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar o agendamento' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DO AGENDAMENTO: ${id}`);

  const schedule = await Schedule.findById(id);
  console.log(schedule);
  if (schedule) {
    await Schedule.deleteOne({ _id: id });
    await db.disconnect();
    res.send({ message: 'Agendamento deletado.' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Agendamento não encontrado.' });
  }
};

const putHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DO AGENDAMENTO: ${id}`);
  try {
    await Schedule.updateOne(
      { _id: id },
      {
        carId: req.body.carId,
        partId: req.body.partId,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        price: req.body.price,
        isReocurrent: req.body.isReocurrent,
        status: req.body.status,
      },
    );

    await db.disconnect();
    res.send({ message: 'Agendamento editado.' });
  } catch (e) {
    await db.disconnect();
    res.status(404).send({ message: 'Agendamento não encontrado.' });
  }
};

export default handler;
