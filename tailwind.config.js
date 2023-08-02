/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './pages/sections/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      {
        sun: {
          primary: '#FFC300',

          secondary: '#232325',

          accent: '#66ddc9',

          neutral: '#292f38',

          'base-100': '#ECEFF4  ',

          info: '#42b6f5',

          success: '#92E3A9',

          warning: '#ecc518',

          error: '#ea1f4b',
        },
        moon: {

          primary: '#000',

          secondary: '#fff',

          accent: '#fff',

          neutral: '#fff',

          'base-100': '#fff  ',

          info: '#fff',

          success: '#fff',

          warning: '#ecc518',

          error: '#ea1f4b',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
