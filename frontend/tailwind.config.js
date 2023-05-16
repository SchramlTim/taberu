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
        'background-secondary': '#ffffff',
        'icon-primary': '#685582',
        'text-primary': '#290521',
        'button-primary': '#ff9500',
        'button-secondary': '#ffffff',
      }
    }
  },
  plugins: [],
}
