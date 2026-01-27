/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Smart POS style base
        sp_bg: "#07071A", // page background
        sp_panel: "#0E1030", // main cards
        sp_panel2: "#0B0C25", // inner panels / chart bg
        sp_border: "rgba(255,255,255,0.10)",

        // Smart POS accents (neon)
        sp_cyan: "#37E7FF",
        sp_blue: "#2C73FF",
        sp_violet: "#7A3CFF",
        sp_pink: "#FF3AA6",
      },
      boxShadow: {
        sp: "0 10px 30px rgba(0,0,0,0.45)",
        spGlow: "0 0 25px rgba(122,60,255,0.18)",
      },
    },
  },
  plugins: [],
};
