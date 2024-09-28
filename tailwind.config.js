/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "#e0f7ed",
        primary: "#21ce99",
        "primary-dark": "#1db586",
        "grey-light": "#e0eaff",
        grey: "#f1f5ff",
        "grey-dark": "#96abc6",
        "font-color": "#b4b4b4",
      },
    },
  },
  plugins: [],
};
