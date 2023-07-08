import User from '../../../../models/User';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const newUser = new User({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    cpf: req.body.cpf,
    rg: req.body.rg,
    email: req.body.email,
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    estado: req.body.estado,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    cep: req.body.cep,
  });
  const savedUser = await newUser.save();
  await db.disconnect();

  res.send(savedUser);
};

export default handler;
