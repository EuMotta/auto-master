import User from '../../../models/User';
import db from '../../../../utils/db';

// Criando um novo usuário
const postHandler = async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: 'aaa',
    lastName: 'bbb',
    cpf: '111.111.111-11',
    rg: '11111111-1',
    email: 'usuario@example.com',
    endereco: 'Rua Exemplo, 123',
    cidade: 'Cidade Exemplo',
    estado: 'Estado Exemplo',
    password: 'Senha Exemplo',
    isAdmin: false,
    cep: '12345-678',
  });
  const user = await newUser.save();
  await db.disconnect();
  res.send({ message: 'Usuário adicionado com sucesso!', user });
};

const getHandler = async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } if (req.method === 'POST') {
    return postHandler(req, res);
  }
  return res.status(400).send({ message: 'Método inválido!' });
};

export default handler;
