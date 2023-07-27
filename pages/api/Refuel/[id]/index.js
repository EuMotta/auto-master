/* eslint-disable no-use-before-define */
import { getSession } from 'next-auth/react';
import Refuel from '../../../../models/Refuel';
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
    const refuel = await Refuel.findById(id);
    await db.disconnect();
    res.send(refuel);
  } catch (error) {
    console.error('Ocorreu um erro na busca do abastecimento:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar o abastecimento' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DA PARTE: ${id}`);

  const refuel = await Refuel.findById(id);
  console.log(refuel);
  if (refuel) {
    await Refuel.deleteOne({ _id: id });
    await db.disconnect();
    res.send({ message: 'Abastecimento deletado.' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Abastecimento não encontrado.' });
  }
};

const putHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DO ABASTECIMENTO: ${id}`);
  try {
    await Refuel.updateOne(
      { _id: id },
      {
        description: req.body.description,
        type: req.body.type,
        quantity: req.body.quantity,
        local: req.body.local,
        date: req.body.date,
        price: req.body.price,
      },
    );

    await db.disconnect();
    res.send({ message: 'Abastecimento editado.' });
  } catch (e) {
    await db.disconnect();
    res.status(404).send({ message: 'Abastecimento não encontrado.' });
  }
};

export default handler;
