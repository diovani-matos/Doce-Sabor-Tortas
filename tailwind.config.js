/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily:{
      'sans': ['Lato', 'sans-serif']
    },
    extend: {
      backgroundImage: {"home": 'url(/assets/bg.png)'},
      colors: {"laranja": '#FF6933'},
    },
  },
  plugins: [],
};
