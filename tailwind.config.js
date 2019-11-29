const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#C79947',
        gray: {
          ...colors.gray,
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
