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
        mytheme: {
        
"primary": "#641ae6",
        
"secondary": "#d926a9",
        
"base-500": "aliceblue",

"neutral": "#2a323c",
        
"base-100": "#1d232a",

"accent": "#0e3575",
        
"info": "#3abff8",
        
"success": "#36d399",
        
"warning": "#fbbd23",
        
"error": "#f87272",


        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
