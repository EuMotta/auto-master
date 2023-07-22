import { getSession } from 'next-auth/react';
import Refuel from '@/models/Refuel';
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
    const refuels = await Refuel.find({ carId: id });
    await db.disconnect();
    res.send(refuels);
  } catch (error) {
    console.error('Ocorreu um erro na busca dos abastecimentos:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar os abastecimentos' });
  }
};

export default handler;
