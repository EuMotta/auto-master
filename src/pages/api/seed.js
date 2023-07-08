import User from '../../models/User';
import data from '../../../utils/dataBackup';
import db from '../../../utils/db';

const handleClick = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.User);
  await db.disconnect();

  res.send({ message: 'Maníaco da Seed!' });
};

export default handleClick;
