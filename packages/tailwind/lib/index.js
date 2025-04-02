const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  (api) => {
    require('./components/typography')(api);
  },
  {
    theme: {
      screens: require('./theme/screens'),
      extend: {
        colors: require('./theme/colors'),
        spacing: require('./theme/spacing'),
      },
      borderRadius: require('./theme/radius'),
      boxShadow: require('./theme/effects'),
    },
  },
);
