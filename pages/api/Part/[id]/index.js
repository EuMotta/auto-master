/* eslint-disable no-use-before-define */
import { getSession } from 'next-auth/react';
import Part from '../../../../models/Part';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  }
  if (req.method === 'PUT') {
    return putHandler(req, res);
  }
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

const deleteHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  console.log(`ID DA PARTE: ${id}`);

  const part = await Part.findById(id);
  console.log(part);
  if (part) {
    await Part.deleteOne({ _id: id });
    await db.disconnect();
    res.send({ message: 'Parte deletada.' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Parte não encontrada.' });
  }
};

const putHandler = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  const options = req.body.optionValue.map((option, key) => {
    option.title = req.body.optionTitle[key].value;
    return option;
  });
  console.log(`ID DA PARTE: ${id}`);
  try {
    await Part.updateOne(
      { _id: id },
      {
        title: req.body.title,
        price: req.body.price,
        options,
      },
    );

    await db.disconnect();
    res.send({ message: 'Parte editada.' });
  } catch (e) {
    await db.disconnect();
    res.status(404).send({ message: 'Parte não encontrada.' });
  }
};

export default handler;
