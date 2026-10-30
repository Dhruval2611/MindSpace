/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F5F8F4',
          100: '#E6EDE5',
          200: '#D2DEC1',
          300: '#BDCFBA',
          DEFAULT: '#A8BDA5',
          500: '#8FA88B',
          600: '#759171',
          700: '#5C7558',
          800: '#445A40',
          900: '#2D3E2B',
        },
        forest: {
          50: '#F0F5F2',
          100: '#D9E6E0',
          200: '#B0CCC0',
          300: '#84B09E',
          400: '#5B937C',
          DEFAULT: '#25483B',
          600: '#1F3C31',
          700: '#193027',
          800: '#12231D',
          900: '#0C1713',
        },
        cream: {
          50: '#FCFAF7',
          DEFAULT: '#F8F5EF',
          100: '#F3EFE6',
          200: '#E8E1D2',
          300: '#DCD2BD',
          400: '#D0C3A8',
        },
        lavender: {
          50: '#F8F6FD',
          100: '#EFEBFB',
          200: '#E5DFF7',
          DEFAULT: '#DCD4F2',
          400: '#C2B3E8',
          500: '#A791DE',
          600: '#8C6FD4',
        },
        peach: {
          50: '#FDF7F5',
          100: '#FAEEE9',
          200: '#F5DDD3',
          DEFAULT: '#F1D5C8',
          400: '#E5B9A4',
          500: '#D99C80',
          600: '#CD7F5D',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(37, 72, 59, 0.06)',
        'soft-lg': '0 16px 40px rgba(37, 72, 59, 0.09)',
        'glow': '0 0 25px rgba(168, 189, 165, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
