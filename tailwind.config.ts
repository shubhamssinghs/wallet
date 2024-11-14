/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F1729",
          100: "#292D32",
          200: "#98999B",
          300: "#F9F9F9",
          400: "#C7C7C7",
          500: "#64748B",
          600: "rgba(0,0,0,0.3)",
          700: "rgba(255,255,255,1)",
        },
        frost: "#ffffff80",
        secondary: {
          DEFAULT: "#46A8DF",
        },
      },
      fontFamily: {
        ithin: ["Inter-Thin", "sans-serif"],
        iextralight: ["Inter-ExtraLight", "sans-serif"],
        ilight: ["Inter-Light", "sans-serif"],
        iregular: ["Inter-Regular", "sans-serif"],
        imedium: ["Inter-Medium", "sans-serif"],
        isemibold: ["Inter-SemiBold", "sans-serif"],
        ibold: ["Inter-Bold", "sans-serif"],
        iextrabold: ["Inter-ExtraBold", "sans-serif"],
        iblack: ["Inter-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
