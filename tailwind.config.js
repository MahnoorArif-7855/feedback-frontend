/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        orange: '#ED7959',
      },
      fontSize: {
        md: '18px',
      },
    },
  },
  plugins: [],
};
