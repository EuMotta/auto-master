/* eslint-disable no-param-reassign */
import { getSession } from 'next-auth/react';
import PartData from '@/models/Part';
import db from '@/utils/db';

const getHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Realize o cadastro');
  }
  await db.connect();
  const parts = await PartData.find({});
  await db.disconnect();
  res.send(parts);
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  }
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
