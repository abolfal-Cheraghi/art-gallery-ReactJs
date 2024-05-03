/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "g-secondary": "#3566e3",
        "g-primary": "#e33535",
        gray: "#777777",
        accent: "#0F133C",
        "pale-gray": "#E1E1E1",
        white: "#ffffff",
      },
      fontFamily: {
        yekanbakh: ["./src/assets/fonts/YekanBakhFaNum-Regular.woff2"],
        "yekanbakh-bold": ["./src/assets/fonts/YekanBakhFaNum-SemiBold.woff2"],
        rokh: ["./src/assets/fonts/RokhFaNum-SemiBold.woff2"],
        "rokh-bold": ["./src/assets/fonts/RokhFaNum-Bold.woff2"],
      },
      fontSize: {
        "s-13": "0.8125rem",
        "s-10": "0.625rem",
        "s-11": "0.6875rem",
      },
    },
  },
  plugins: [],
};
