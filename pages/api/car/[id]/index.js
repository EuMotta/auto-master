import { getSession } from 'next-auth/react';
import Car from '../../../../models/Car';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'Acesse a sua conta' });
  }
  await db.connect();
  const { id } = req.query;
  console.log('id: ', id);
  try {
    const car = await Car.findById(id);
    await db.disconnect();
    res.send(car);
  } catch (error) {
    console.error('Ocorreu um erro na busca do carro:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar o carro' });
  }
};

export default handler;
