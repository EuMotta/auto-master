import Car from '../../../models/Car';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  try {
    await db.connect();

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
      headlights: { model: headlightsModel, buyDate: headlightsBuyDate },
      tires: { brand: tiresBrand, frontSize: tiresFrontSize, rearSize: tiresRearSize },
      test: [{ title: testTitle, options: [{ title: optionTitle, value: optionValue }] }],
    } = req.body;

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
      headlights: {
        model: headlightsModel,
        buyDate: headlightsBuyDate,
      },
      tires: {
        brand: tiresBrand,
        frontSize: tiresFrontSize,
        rearSize: tiresRearSize,
      },
      test: [
        {
          title: testTitle,
          options: [
            {
              title: optionTitle,
              value: optionValue,
            },
          ],
        },
      ],
    });

    const car = await newCar.save();

    await db.disconnect();

    res.status(201).send({ message: 'Car added successfully!', car });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getHandler = async (req, res) => {
  try {
    await db.connect();

    const cars = await Car.find({});

    await db.disconnect();

    res.send(cars);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } if (req.method === 'POST') {
    return postHandler(req, res);
  }
  res.status(400).send({ message: 'Bad Request' });
};

export default handler;
