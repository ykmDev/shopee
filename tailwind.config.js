/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#694e21",
        soft_primary: "#806331",
        dark_primary: "#614a23",
        bg_primary: "#fafafa",
      },
      fontFamily: {
        "noto-sans": "'Noto Sans Myanmar'",
        "noto-serif": "'Noto Serif Myanmar'",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
  ],
};
