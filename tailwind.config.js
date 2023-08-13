/** @type {import('tailwindcss').Config} */
const form = require('@tailwindcss/forms')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [
    form
  ],
}