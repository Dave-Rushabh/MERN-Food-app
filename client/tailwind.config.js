/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        greatVibes: ['Great Vibes', 'cursive'],
      },
      colors: {
        app_primary_dark: '#2f4858',
        app_primary_light: '#33658a',
        app_secondary_light: '#86bbd8',
        app_primary_yellow: '#f6ae2d',
        app_primary_orange: '#f26419',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        'x-sm': '450px',
        'xx-sm': '350px',
      },
    },
  },
  plugins: [],
};
