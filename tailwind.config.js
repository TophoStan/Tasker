/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6d27ce',
        'secondary': '#dedcff',
        'accent': '#433bff',
        'base-black-color': '#040316',
        'secondary-light': '#6d27ce0d',
        'white': '#fbfbfe',
      }
    },
  },
  plugins: [],
}

