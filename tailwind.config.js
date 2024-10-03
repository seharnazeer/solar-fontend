/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#263238",
        themeRed: "#C40C34",
        themeBlack: "#19191A",
        themeGray: "#767C8C",
        themeMainGray: "#F1F5F9",
        themeLightGray: "#EBEDF0",
        themeBorderGray: "#EBEDF0",
        themeDarkBlue: "#1C0B2C",
        themeBlue: "#002C6B"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        textShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      },
    },
  },
  plugins: [],
};
