import { getSession } from 'next-auth/react';
import Car from '../../../../models/Car';
import db from '../../../../utils/db';
import { useParams } from 'next/navigation';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'Acesse a sua conta' });
  }
  await db.connect();
  const id = req.query.id;
  console.log('id: ', id);
  const car = await Car.findById('64ac0f1a999acfe45185e20d');
  await db.disconnect();
  res.send({ car });
};

export default handler;
