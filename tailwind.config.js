/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        valentine: {
          pink: '#ffafd8',
          red: '#d62828',
          love: '#ef476f',
          lavender: '#E0C3FC',
          blush: '#FFC3A0',
        },
        glass: 'rgba(255, 255, 255, 0.25)',
      },
      fontFamily: {
        romantic: ['"Pacifico"', 'cursive'],
        elegant: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
