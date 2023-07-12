import PartData from '../../../models/Part';
import db from '../../../utils/db';

const postHandler = async (req, res) => {
  await db.connect();
  const newPart = new PartData({
    owner: req.body.owner,
    title: req.body.title,
    options: req.body.options,
  });
  const part = await newPart.save();
  await db.disconnect();
  res.send({ message: 'Part added successfully!', part });
};

const getHandler = async (req, res) => {
  await db.connect();
  const part = await PartData.find({});
  await db.disconnect();
  res.send(part);
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
