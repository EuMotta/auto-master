/* eslint-disable no-param-reassign */
import User from '@/models/User';
import db from '@/utils/db';

const putHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DO USUARIO: ${id}`);
  try {
    await User.updateOne({ _id: id }, {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    await db.disconnect();
    res.send({ message: 'Usuario editado.' });
  } catch (e) {
    await db.disconnect();
    res.status(404).send({ message: 'Usuario não encontrado.' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const user = await User.find({ _id: req.query.id });
  await db.disconnect();
  res.send(user);
};

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    return putHandler(req, res);
  } if (req.method === 'GET') {
    return getHandler(req, res);
  }
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
