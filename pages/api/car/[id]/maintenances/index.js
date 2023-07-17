import { getSession } from 'next-auth/react';
import Maintenance from '@/models/Maintenance';
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
    const maintenances = await Maintenance.find({ carId: id });
    await db.disconnect();
    res.send(maintenances);
  } catch (error) {
    console.error('Ocorreu um erro na busca das Manutenções:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar as pecas' });
  }
};

export default handler;
