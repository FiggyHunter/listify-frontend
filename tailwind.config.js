/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "200px",
      // => @media (min-width: 640px) { ... }

      md: "900px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontSize: {
        xsm: "0.8rem",
      },
      borderWidth: {
        1: "0.25px",
        2: "0.75px",
        3: "2px",
      },
      width: {
        "70p": "70%",
        "75p": "75%",
      },
      colors: {
        accent: {
          1: "var(--color-accent1)",
          2: "var(--color-accent2)",
        },
        bkg: "var(--color-bkg)",
        bkgContrast: "var(--bkg-contrast)",
        content: "var(--color-content)",
        transparentFill: "var(--input-fill)",
        crimson: "#E56B6F",
        crimsonHover: "#D85C60",
        darkBlue: "#2E5077",
        darkBlueHover: "#1D3550",
        labelFill: "var(--text-label-fill)",
        labelBkg: "var(--label-bkg)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      height: {
        screen: ["100vh /* fallback for Opera, IE and etc. */", "100dvh"],
        fill: ["100vh /* fallback for Opera, IE and etc. */", "100dvh"],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        ".h-my-screen": {
          minHeight: ["100vh /* fallback for Opera, IE and etc. */", "100dvh"],
        },
        ".min-h-half": {
          minHeight: ["50%"],
        },
        ".max-h-half": {
          maxHeight: ["50%"],
        },
        ".custom-cols-dash": {
          gridTemplateColumns: "2fr 6fr",
        },
        ".custom-cols-company": {
          gridTemplateColumns: "2fr 7fr",
        },
        ".custom-rows": {
          gridAutoRows: "max-content",
        },
        ".custom-rows-2": {
          gridTemplateRows: "min-content 1fr",
        },
      });
    }),
  ],
};
