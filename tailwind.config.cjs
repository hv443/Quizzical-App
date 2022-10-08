/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var( --primary)",
        secondary: "var( --secondary)",
        activeState: "var(--active)",
        correctState: "var( --correct)",
        incorrectState: "var(--incorrect)",
        offState: "var(--off)",
        hoverState: "var(--hover)",
        theme:"var(--theme)"
      }
    },
  },
  plugins: [],
}