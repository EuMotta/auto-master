/* eslint-disable no-use-before-define */
import { getSession } from 'next-auth/react';
import Maintenance from '../../../../models/Maintenance';
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
    const part = await Maintenance.findById(id);
    await db.disconnect();
    res.send(part);
  } catch (error) {
    console.error('Ocorreu um erro na busca do partro:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar a parte' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DA PARTE: ${id}`);

  const part = await Maintenance.findById(id);
  console.log(part);
  if (part) {
    await Maintenance.deleteOne({ _id: id });
    await db.disconnect();
    res.send({ message: 'Maintenancee deletada.' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Maintenancee não encontrada.' });
  }
};

const putHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DA MANUTENÇÃO: ${id}`);
  try {
    await Maintenance.updateOne(
      { _id: id },
      {
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
