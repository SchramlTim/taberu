module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['"Quicksand"', 'sans-serif']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'background-primary': '#F6F6F6',
        'background-secondary': '#0F0F0F',
        'icon-primary': '#989898',
        'primary': '#F96F2E',
      }
    }
  },
  plugins: [],
}
