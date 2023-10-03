/** @type {import('tailwindcss').Config} */
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
    extend: {
      colors: {
        'lightGray': '#4b5563',
        'darkGray': '#374151'
      }
    },
  },
  plugins: [
    
  ],
  
}