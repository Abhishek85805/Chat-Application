/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkGrey: '#2f323e',
        lightPurple: '#7851f2',
        lightBlue: '#e7eff7',
        lightGrey: '#cbced3'
      },

      fontFamily: {
        sans: ["Poppins", 'sans-serif']
      }
    },
    darkMode: "class",
    plugins: [nextui()]
  },
  plugins: [],
}