module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@takeoff-ui/tailwind')],
};
