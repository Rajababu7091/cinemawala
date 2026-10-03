/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cw: {
          bg: '#0A0B0E',
          card: '#12141A',
          cardHover: '#181B24',
          surface: '#1E222D',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(235, 30, 45, 0.4)',
          red: {
            DEFAULT: '#E50914',
            crimson: '#FF2A3A',
            glow: 'rgba(229, 9, 20, 0.35)',
            dark: '#B20710',
          },
          gold: '#F5C518',
          muted: '#8E95A5',
          light: '#F3F4F6'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(229, 9, 20, 0.45)',
        'glow-sm': '0 0 12px -2px rgba(229, 9, 20, 0.35)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
