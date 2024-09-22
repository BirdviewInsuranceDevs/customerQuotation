// tailwind.config.js
module.exports = {
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
};
