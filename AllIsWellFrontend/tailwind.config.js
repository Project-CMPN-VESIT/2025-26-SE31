/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6A9C89', // Muted Sage
          DEFAULT: '#16423C', // Deep Forest Green
          dark: '#0D2B26',
        },
        secondary: {
          light: '#E6A4A4', // Soft Rose
          DEFAULT: '#C96868', // Warm Terracotta
          dark: '#B25353',
        },
        accent: {
          light: '#FFF4D6',
          DEFAULT: '#FADFA1', // Muted Gold
          dark: '#E6C97F',
        },
        background: {
          light: '#F8F8F0',
          DEFAULT: '#F1F1E6', // Soft Linen/Cream
          dark: '#E7E7D9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.03)',
        'premium': '0 20px 40px -15px rgba(22, 66, 60, 0.1), 0 10px 20px -10px rgba(22, 66, 60, 0.05)',
      }
    },
  },
  plugins: [],
}

