const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#C79947',
        gray: {
          ...colors.gray,
          f0: '#F0F0F0',
          96: '#969696',
          db: '#DBDBDB',
          c4: '#C4C4C4',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        circular: 'Circular Std, sans-serif, serif',
      },
    },
  },
  variants: {},
  plugins: [],
};
