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
    {
      name: 'Pedrão2',
      lastName: 'Do Carmo',
      image: '/imgUser/user.png',
      email: 'usuario1@example.com',
      password: bcrypt.hashSync('teste'),
      isAdmin: false,
    },
  ],
  cars: {
    owner: '64ab0f9ccaca93336f866bac',
    image: 'image',
    brand: 'BMW',
    model: 'X5',
    fueltype: 'Gasolina',
    hodometro: 1000,
    color: 'Verde',
    year: '2017',
    licensePlate: 'ABC-1234',
    chassis: '',
  },
  parts: {
    carId: '64ab0f9ccaca93336f866bac',
    title: 'farol',
    price: 5,
    options: [
      {
        title: 'Força da luz',
        value: '10',
      },
    ],
  },
};
export default data;
