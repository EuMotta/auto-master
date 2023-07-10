import CarData from '../../../models/Car';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  console.log('test');
  await db.connect();
  const newCar = new CarData({
    owner: req.body.owner,
    brand: req.body.brand,
    model: req.body.model,
    fueltype: req.body.fueltype,
    hodometro: req.body.hodometro,
    color: req.body.color,
    year: req.body.year,
    licensePlate: req.body.licensePlate,
    chassis: req.body.chassis,
    headlights: {
      model: req.body.headlights.model,
      buyDate: req.body.headlights.buyDate,
    },
    tires: {
      brand: req.body.tires.brand,
      frontSize: req.body.tires.frontSize,
      rearSize: req.body.tires.rearSize,
    },
    test: req.body.test,
  });
  const car = await newCar.save();
  await db.disconnect();
  res.send({ message: 'Car added successfully!', car });
};

const getHandler = async (req, res) => {
  await db.connect();
  const car = await CarData.find({});
  await db.disconnect();
  res.send(car);
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } if (req.method === 'POST') {
    return postHandler(req, res);
  }
  return res.status(400).send({ message: 'Erro 400' });
};

export default handler;
