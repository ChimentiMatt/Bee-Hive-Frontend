/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2C87D7',
        'primary-green': '#9ADFB1',
        'primary-yellow': '#F7F06A'
      },
    },
  },
  plugins: [],
}

