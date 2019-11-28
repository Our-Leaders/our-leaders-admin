const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#CE9833',
        gray: {
          ...colors.gray,
        },
        white: '#FFFFFF'
      },
    },
  },
  variants: {},
  plugins: []
}
