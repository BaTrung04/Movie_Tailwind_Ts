/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
      },
      container: {
        center: "true",
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      screens: {
        lg: "800px", // Thêm breakpoint mới cho 670px
      },
    },
  },
  plugins: [require("daisyui")],
};
