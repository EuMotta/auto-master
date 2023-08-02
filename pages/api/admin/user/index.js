/* eslint-disable no-unused-expressions */
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import db from '@/utils/db';

const getHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Acesso negado');
  }
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users.reverse());
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  }
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
