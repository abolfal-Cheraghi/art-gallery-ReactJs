/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "1rem",
          xl: "1rem",
          "2xl": "7rem",
        },
      },
      colors: {
        "g-secondary": "#3566e3",
        "g-primary": "#e33535",
        gray: "#777777",
        accent: "#0F133C",
        "pale-gray": "#E1E1E1",
        white: "#ffffff",
        "gray-dark": "#dddddd",
      },
      fontFamily: {
        yekanbakh: ["YekanBakh"],
        "yekanbakh-bold": ["YekanBakh-bold"],
        rokh: ["Rokh"],
        "rokh-bold": ["Rokh-Bold"],
      },
      fontSize: {
        "s-13": "0.8125rem",
        "s-10": "0.625rem",
        "s-11": "0.6875rem",
        "s-15": "0.9375",
        "s-17": "1.0625rem",
        "s-26": "1.625rem",
      },
      boxShadow: {
        cart: "0px 0px 18px 0px rgba(0, 0, 0, 0.05",
      },

      backgroundImage: {
        "hero-pattern": "url('/pattern-2.png')",
        "shape-flower-right": "url('/shapeR.png')",
        "shape-flower-left": "url('/shapeL.png')",
        "shape-flower": "url('/shape.png')",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
