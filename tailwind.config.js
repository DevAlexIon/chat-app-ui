/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        22: "88px",
        369: "369px",
      },
      margin: {
        96: "496px",
      },
      boxShadow: {
        custom: "0 0 24px 0 rgba(0, 0, 0, 0.08)",
      },
      colors: {
        "custom-purple": "#615EF0",
        "purple-400": "#9f7aea",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
    },
  },
  plugins: [],
};
