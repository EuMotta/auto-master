/* eslint-disable no-unused-expressions */
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import db from '@/utils/db';

const getHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Realize o cadastro');
  }

  let pag = req.query.pag;
  let pages = await User.countDocuments({})/20;
  pages = Math.ceil(pages);
  await db.connect();
  
  let users = await User.find({}).skip(20*pag).limit(20);
  await db.disconnect();
  res.send({users, pages});
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } 
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
