/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      darkBlue: "#241fdd",
      blue: "#4153ef",
      lightBlue: "#cfcfff",
      lightGray: "#9ca3af",
      whiteGray: "#f7f7f7",
      white: "#ffffff",
      black: "#202020",
    },
    extend: {
      fontFamily: {
        RobotoSlab: ["Roboto Slab", "sans-serif"],
      },
    },
  },
  plugins: [],
}
