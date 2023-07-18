import { getSession } from 'next-auth/react';
import Car from '../../../models/Car';
import Part from '../../../models/Part';
import User from '../../../models/User';
import db from '../../../utils/db';
import Maintenance from '@/models/Maintenance';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Administrador, acesse sua conta');
  }

  await db.connect();

  const carCount = await Car.countDocuments();
  const partCount = await Part.countDocuments();
  const usersCount = await User.countDocuments();
  const maintenanceCount = await Maintenance.countDocuments();

  await db.disconnect();

  res.send({
    carCount,
    partCount,
    usersCount,
    maintenanceCount,
  });
};

export default handler;
