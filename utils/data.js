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
    type: 3,
    year: '2017',
    licensePlate: 'ABC-1234',
    chassis: 'aaaa',
  },
  parts: {
    carId: '64b7c1b17583eff72e1197e3',
    title: 'farol',
    price: 5,
    options: [
      {
        title: 'Força da luz',
        value: '10',
      },
    ],
  },
  maintenances: {
    carId: '64b7c1b17583eff72e1197e3',
    partId: '64b56bfc3dad753214f0bb77',
    title: 'Troca do farol',
    subtitle: 'Troca do led do farol para neon',
    description: 'A troca deve ser feita na mecanica xuruta, com neon azul escuro',
    date: new Date('2023-07-19T10:32:48Z'),
    price: 55,
  },
  reviews: {
    carId: '64b7c1b17583eff72e1197e3',
    partId: '64b56bfc3dad753214f0bb77',
    total: false,
    title: 'Troca do farol',
    subtitle: 'Troca do led do farol para neon',
    description: 'A troca deve ser feita na mecanica xuruta, com neon azul escuro',
    date: new Date('2023-07-19T10:32:48Z'),
    price: 55,
  },
  refuels: {
    carId: '64b7c1b17583eff72e1197e3',
    title: 'Abastecido no posto do Ipiranga',
    type: 'Gasolina',
    description: 'Abastecimento de gasolina aditivada',
    quantity: 200,
    local: 'Posto Ipiranga da rua do OZE',
    date: new Date('2023-07-19T10:32:48Z'),
    price: 55,
  },
};
export default data;
