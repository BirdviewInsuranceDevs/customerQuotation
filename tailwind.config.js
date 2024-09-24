/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'step-active': '#ffffff',  
        'step-inactive': '#cfcfcf',  
      },
    },
  },
  plugins: [],
}


