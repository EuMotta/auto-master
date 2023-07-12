import User from '../../models/User';
import Car from '../../models/Car';
import Part from '../../models/Part';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await Part.deleteMany();
  await Car.deleteMany();
  await User.insertMany(data.users);
  await Part.insertMany(data.parts);
  await Car.insertMany(data.cars);
  await db.disconnect();
  res.send({ message: 'Maníaco da Seed' });
};
export default handler;
