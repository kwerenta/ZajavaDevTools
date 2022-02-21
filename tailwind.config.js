module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Spartan", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        zajavaBlue: {
          900: "hsl(234, 18%, 11%)",
          800: "hsl(234, 23%, 20%)",
          700: "hsl(199, 94%, 29%)",
          600: "hsl(199, 94%, 39%)",
          500: "hsl(199, 94%, 49%)",
        },
      },
    },
  },
  plugins: [],
};
