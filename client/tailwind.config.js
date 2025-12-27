/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B0000" ,
        secondary: "#14171A",
        accent: "#657786",
        background: "#E1E8ED",
        hover: "#FF5349"
      },
    },
  },
  plugins: [],
}
