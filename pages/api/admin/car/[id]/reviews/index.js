import { getSession } from 'next-auth/react';
import Review from '@/models/Review';
import db from '@/utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'Acesse a sua conta' });
  }
  await db.connect();
  const { id } = req.query;
  console.log('id: ', id);
  try {
    const reviews = await Review.find({ carId: id });
    await db.disconnect();
    res.send(reviews);
  } catch (error) {
    console.error('Ocorreu um erro na busca das revisões:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar as revisões' });
  }
};

export default handler;
