/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#232f42",
        blackHigh: "#272730",
        paragraph: "#555568",
        bgDarkMode: "#121224",
        blackLow: "#A0A1BB",
        blackMedium: "#555568",
        blackHighEmp: "#272730",
        neutralColorsBlack: "#181A20",
        cardBorder: "#CDD2F0",
        sectionParagraph: "#A0A1BB",
        primaryTwoHundread: "#CDD2F0",
        primaryThreeHundread: "#828ED8",
        primaryFiveHundread: "#5454C0",
        primaryEightHundread: "#393672",
        primaryNineHundread: "#282546",
        nutralColorNineHundread: "#171727",
        whiteMedium: "#EEEEF4",
        slateLow: "#E0E0E0",
        main: "#EFFEFD",
        // main variants
        "main-200": "#DAEDFF",
        "main-300": "#BEE0FF",
        "main-900": "#1C418C",
        "main-100": "#EFF7FF",
        "black-600": "#757575",
        overlay: "rgba(0,0,0,0.4)",
        basecolor: "#03BBBE",
        errorColor: "#FF6B6B",
        errorHigh: "#F93A6E",
        tablenav: "#E3EFFB",
      },
      spacing: {},
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xl: "20px",
        inherit: "inherit",
      },
      backgroundImage: {
        bgImage: "url('/src/assets/images/backdrop.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
