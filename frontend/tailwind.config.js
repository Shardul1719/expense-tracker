/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🔥 REQUIRED FOR TOGGLE
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",   // violet-600
        accent: "#22d3ee",    // cyan-400
        darkbg: "#09090b",    // zinc-950
        darkcard: "#18181b", // zinc-900
      },
    },
  },
  plugins: [],
};
