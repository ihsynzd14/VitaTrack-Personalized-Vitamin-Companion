/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}"
  ],
  
  theme: {
    extend: {
      colors: {
        cwhite: {
          base: "#E7E7E7",
          dark: "#F5F5F5",
        }, // Define your custom white color here
        black: {
          base: "#24252B",
          dark: "#181A20",
        },
      },
    },
  },
  plugins: [],
}
