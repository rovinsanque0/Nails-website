/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        cocoa:  "#664E44",
        dusty:  "#B08B7F",
        cream:  "#FAF4E5",
        peach:  "#FFE8D6",
        sage:   "#C7C3B0",
      },
    },
  },
  plugins: [],
}
