/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontWeight: {
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
      },
      colors: {
        primary: {
          DEFAULT: '#E8A020',
          50: 'rgba(232,160,32,0.05)',
          100: 'rgba(232,160,32,0.1)',
          200: 'rgba(232,160,32,0.2)',
          300: 'rgba(232,160,32,0.3)',
          500: '#E8A020',
          600: '#C98A10',
        },
        secondary: '#7B6FD4',
        accent: '#4ECDC4',
        highlight: '#E8619A',
        surface: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          elevated: 'rgba(255,255,255,0.06)',
        },
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '4px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(232,160,32,0.25), 0 0 40px rgba(232,160,32,0.10)',
        'glow-purple': '0 0 20px rgba(123,111,212,0.25)',
        'glow-teal': '0 0 20px rgba(78,205,196,0.25)',
        'glow-pink': '0 0 20px rgba(232,97,154,0.25)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};