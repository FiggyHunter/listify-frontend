/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "200px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
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
        content: "var(--color-content)",
        transparentFill: "var(--input-fill)",
        crimson: "#E56B6F",
        crimsonHover: "#D85C60",
        darkBlue: "#2E5077",
        darkBlueHover: "#1D3550",
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

  plugins: [],
};
