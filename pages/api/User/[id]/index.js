/* eslint-disable no-param-reassign */
import User from '@/models/User';
import db from '@/utils/db';

const putHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DO USUARIO: ${id}`);
  try {
    const alteredUser = {};

    if (req.body.name) {
      alteredUser.name = req.body.name;
    }

    if (req.body.lastName) {
      alteredUser.lastName = req.body.lastName;
    }

    if (req.body.email) {
      alteredUser.email = req.body.email;
    }

    await User.updateOne({ _id: id }, alteredUser);

    await db.disconnect();
    res.send({ message: 'Usuario editado.' });
  } catch (e) {
    await db.disconnect();

    res.status(404).send({ message: 'Erro ao atualizar o usuario' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const user = await User.findOne({ _id: req.query.id });
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
