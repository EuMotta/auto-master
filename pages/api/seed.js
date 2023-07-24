import User from '../../models/User';
import Car from '../../models/Car';
import Maintenance from '../../models/Maintenance';
import Part from '../../models/Part';
import Review from '../../models/Review';
import Refuel from '../../models/Refuel';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await Part.deleteMany();
  await Maintenance.deleteMany();
  await Review.deleteMany();
  await Refuel.deleteMany();
  await Car.deleteMany();
  await User.insertMany(data.usersFast);
  await Part.insertMany(data.parts);
  await Refuel.insertMany(data.refuels);
  await Maintenance.insertMany(data.maintenances);
  await Review.insertMany(data.reviews);
  await Car.insertMany(data.cars);
  await db.disconnect();
  res.send({ message: 'Maníaco da Seed' });
};
export default handler;
