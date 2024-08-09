/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'md': {'min': '0px', 'max':'720px'}
    },
    extend: {
      backgroundImage: {
        'home-page': "url('/src/assets/home.jpg')"
      }
    },
  },
  plugins: [],
}