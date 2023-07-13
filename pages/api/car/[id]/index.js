/* eslint-disable no-use-before-define */
import { getSession } from 'next-auth/react';
import Car from '../../../../models/Car';
import db from '../../../../utils/db';
import Part from '@/models/Part';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'Acesse a sua conta' });
  }
  await db.connect();
  const { id } = req.query;
  console.log('id: ', id);
  try {
    const car = await Car.findById(id);
    await db.disconnect();
    res.send(car);
  } catch (error) {
    console.error('Ocorreu um erro na busca do carro:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar o carro' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DO CARRO: ${id}`);
  await Part.deleteMany({carId: id});
  try {
    await Car.deleteOne({ _id: id });
    await db.disconnect();
    res.send({ message: 'carro deletado.' });
  } catch(e) {
    await db.disconnect();
    res.status(404).send({ message: 'Carro não encontrado.' });
  }
};

export default handler;
