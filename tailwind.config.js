/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.88rem',  // Increased by 10%
        base: '1.1rem', // Increased by 10%
        lg: '1.25rem',  // Increased by 10%
        xl: '1.375rem', // Increased by 10%
        '2xl': '1.719rem', // Increased by 10%
        '3xl': '2.148rem', // Increased by 10%
        '4xl': '2.685rem', // Increased by 10%
        '5xl': '3.357rem', // Increased by 10%
    },
    fontFamily:{
      'luminari': ['Luminari', 'sans-serif'],
      'orchideeLight': ['OrchideeLight', 'sans-serif'],
      'orchideeMed': ['OrchideeMedium', 'sans-serif'],
      'vinque': ["Vinque", "sans-serif"],
      'petrock':['Kingthings Petrock Light', 'sans-serif'],
      'exeter': ['Kingthings Exeter', 'sans-serif']

    },
    textShadow: {
      sm: '1px 1px 2px var(--tw-shadow-color)',
      DEFAULT: '2px 2px 4px var(--tw-shadow-color)',
      lg: '4px 4px 8px var(--tw-shadow-color)',
      xl: '4px 4px 16px var(--tw-shadow-color)',
      },
    extend: {
      backgroundImage: theme => ({
        'undead': "url('./src/assets/portraits/undead.svg')",
        'paper': 'url("./src/assets/light-paper-fibers.png")',
      }),
      colors: {
        'lightGray': '#4b5563',
        'darkGray': '#374151'
      }
    },
  },
  plugins: [plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  }
)
    
  ],
  
}