/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  },
  plugins: [],
}