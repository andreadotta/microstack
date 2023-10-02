/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b1f2b', // dark-purple
          dark: '#db162f', // fire-engine-red (considerato una variazione scura del primary)
          light: '#dbdfac', // vanilla (considerato una variazione chiara del primary)
        },
        secondary: {
          DEFAULT: '#5f758e', // slate-gray
          dark: '#383961', // delft-blue (considerato una variazione scura del secondary)
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
