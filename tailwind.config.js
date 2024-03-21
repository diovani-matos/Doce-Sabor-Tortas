/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {
      backgroundImage: { home: "url(/assets/background3.jpg)" },
      colors: {
        customgreen: "#98FB98",
        chocolate: "#8B4513",
        custompink: "#FF6F61",
        creme: "#FFFACD",
      },
    },
  },
  plugins: [],
};
