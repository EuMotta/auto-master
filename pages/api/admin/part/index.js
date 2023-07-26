/* eslint-disable no-param-reassign */
import { getSession } from 'next-auth/react';
import PartData from '@/models/Part';
import db from '@/utils/db';

const getHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Realize o cadastro');
  }

  const { name } = req.query;

  await db.connect();
  let parts;
  const { pag } = req.query;
  if (name) {
    parts = await PartData.find({ name }).select('name');
  } else {
    let pages = await PartData.countDocuments({}) / 20;
    pages = Math.ceil(pages);
    await db.connect();
    parts = await PartData.find({}).skip(20 * pag).limit(20);
    await db.disconnect();
    res.send({ parts, pages });
  }

  await db.disconnect();
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  }
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
