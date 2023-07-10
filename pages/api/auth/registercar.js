import Car from '../../../models/Car';
import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const {
    owner,
    brand,
    model,
    fueltype,
    hodometro,
    color,
    year,
    licensePlate,
    chassis,
    headlights,
    tires,
    test,
  } = req.body;

  await db.connect();

  const newCar = new Car({
    owner,
    brand,
    model,
    fueltype,
    hodometro,
    color,
    year,
    licensePlate,
    chassis,
    headlights,
    tires,
    test,
  });

  const car = await newCar.save();
  await db.disconnect();

  res.status(201).send({
    message: 'Carro registrado com sucesso!',
    car,
  });
}

export default handler;
