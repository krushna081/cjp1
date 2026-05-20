/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4EBD7',
          2: '#EADFC4',
          3: '#DBCBA5',
        },
        ink: {
          DEFAULT: '#1A1108',
          2: '#3A2A1C',
          3: '#6A5440',
        },
        saffron: {
          DEFAULT: '#E0651E',
          2: '#F0823A',
          deep: '#B84915',
        },
        green: {
          DEFAULT: '#1F5A2E',
          2: '#2D7A45',
        },
        blood: '#8B1A1A',
        gold: '#C9A227',
      },
      fontFamily: {
        display: ['Bowlby One', 'Impact', 'sans-serif'],
        condensed: ['Oswald', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 50s linear infinite',
        'marquee': 'marquee 32s linear infinite',
        'livepulse': 'livepulse 1.6s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        livepulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.65)' },
        },
      },
    },
  },
  plugins: [],
}