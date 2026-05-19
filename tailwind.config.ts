import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000',
          1: '#050505',
          2: '#0A0A0A',
          3: '#111111',
          4: '#1A1A1A',
          5: '#2A2A2A',
        },
        fg: {
          DEFAULT: '#F5F5F7',
          2: '#C2C2C8',
          3: '#8A8A92',
          4: '#56565C',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          2: 'rgba(255,255,255,0.12)',
          3: 'rgba(255,255,255,0.2)',
        },
        accent: {
          DEFAULT: '#FF1A1A',
          deep: '#C80000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '14px',
        'card-lg': '22px',
        block: '32px',
      },
      boxShadow: {
        'btn-red': '0 0 0 1px rgba(255,255,255,.15) inset, 0 1px 0 rgba(255,255,255,.4) inset, 0 10px 30px -10px rgba(255,26,26,.7), 0 0 60px -10px rgba(255,26,26,.4)',
        'btn-red-hover': '0 0 0 1px rgba(255,255,255,.2) inset, 0 1px 0 rgba(255,255,255,.5) inset, 0 14px 36px -10px rgba(255,26,26,.9), 0 0 80px -10px rgba(255,26,26,.7)',
        'btn-red-cta': '0 0 0 1px rgba(255,255,255,.15) inset, 0 1px 0 rgba(255,255,255,.4) inset, 0 14px 36px -10px rgba(255,26,26,.9), 0 0 100px -10px rgba(255,26,26,.8)',
        'card-hover': '0 20px 40px -10px rgba(0,0,0,.8)',
        toast: '0 20px 40px -10px rgba(0,0,0,.8), 0 0 40px -10px rgba(255,26,26,.3)',
      },
      backdropBlur: {
        glass: '20px',
        nav: '24px',
      },
      animation: {
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
        'laptop-float': 'laptopFloat 7s ease-in-out infinite',
        'showcase-float': 'showcaseFloat 7s ease-in-out infinite',
        'drift-1': 'drift1 22s ease-in-out infinite',
        'drift-2': 'drift2 28s ease-in-out infinite',
        'drift-3': 'drift3 32s ease-in-out infinite',
        'cta-glow': 'ctaGlow 4s ease-in-out infinite',
      },
      keyframes: {
        pulseDot: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '.6' },
        },
        laptopFloat: {
          '0%,100%': { transform: 'translateY(calc(-50% - 14px)) rotate(-2deg)' },
          '50%': { transform: 'translateY(calc(-50% + 14px)) rotate(2deg)' },
        },
        showcaseFloat: {
          '0%,100%': { transform: 'translateY(-8px) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(8px) rotate(1.5deg)' },
        },
        drift1: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(40px,-30px)' },
        },
        drift2: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(-30px,40px)' },
        },
        drift3: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(30px,-20px)' },
        },
        ctaGlow: {
          '0%,100%': { opacity: '.85' },
          '50%': { opacity: '1' },
        },
      },
      maxWidth: {
        container: '1320px',
      },
    },
  },
  plugins: [],
} satisfies Config
