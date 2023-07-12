import { getSession } from 'next-auth/react';
import Part from '../../../../models/Part';
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
    const part = await Part.findById(id);
    await db.disconnect();
    res.send(part);
  } catch (error) {
    console.error('Ocorreu um erro na busca do partro:', error);
    await db.disconnect();
    return res.status(500).send({ message: 'Erro ao buscar a parte' });
  }
};

export default handler;
