/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /* tailwind.config.js */
extend: {
  animation: {
    'spin-slow': 'spin 8s linear infinite',
  },
}
,
  },
    plugins: [require("daisyui")],

}

