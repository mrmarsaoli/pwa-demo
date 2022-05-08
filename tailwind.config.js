const { MAIN, SEMANTIC } = require("./constants/colors.js").COLORS;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: MAIN.PRIMARY,
        secondary: MAIN.SECONDARY,
        neutrals: MAIN.NEUTRALS,
        green: SEMANTIC.GREEN,
        red: SEMANTIC.RED,
        blue: SEMANTIC.BLUE,
        amber: SEMANTIC.AMBER,
      },
    },
  },
  plugins: [],
};
