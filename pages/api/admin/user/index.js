/* eslint-disable no-unused-expressions */
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import db from '@/utils/db';

const getHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).send('Realize o cadastro');
    }
    const { pag } = req.query;
    await db.connect();
    let pages = await User.countDocuments({}) / 20;
    pages = Math.ceil(pages);
    const users = await User.find({}).skip(20 * pag).limit(20);
    await db.disconnect();
    res.send({ users, pages });
  } catch (err) {
    res.send(err.toString());
  }
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  }
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
