// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        fontSize: {
          '10xl': ['10rem', { lineHeight: '1' }]
        },
        
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }