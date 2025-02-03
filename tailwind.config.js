const primeui = require('tailwindcss-primeui');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
  theme: {
    extend: {
      darkMode: ['selector', '[data-mode="dark-theme"]'],
    },
  },
  plugins: [primeui],
};
