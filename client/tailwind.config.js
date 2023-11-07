/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: "#e4e2df",
          strength: "#c6c3bf"
        },
        navy: {
          light: "#787f9f",
          normal: "#4c5881",
          strength: "#575a77"
        }
      }
    },
  },
  plugins: [],
}

