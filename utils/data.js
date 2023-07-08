/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'José',
      lastName: 'Antonio Motta',
      image: '/imgUser/admin.png',
      email: 'admin@example.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: true,
    },
    {
      name: 'Pedrão',
      lastName: 'Do Carmo',
      image: '/imgUser/user.png',
      email: 'user@example.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false,
    },
  ],
};
export default data;
