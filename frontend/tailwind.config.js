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
      },
      keyframes: {
        press: {
          "0%, 100%": { transform: "scale(1.0)" },
          "50%": { transform: "scale(0.95)" }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      animation: {
        press: "press 200ms ease-in-out",
        fadeIn: "fadeIn 500ms ease-in-out"
      }
    }
  },
  plugins: [],
}
