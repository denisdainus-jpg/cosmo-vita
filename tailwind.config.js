/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        rosegold: {
          50: '#faf5f2',
          100: '#f4e8e1',
          200: '#e8d1c4',
          300: '#dab2a0',
          400: '#c8907a',
          500: '#b8826a',
          600: '#a8705a',
          700: '#8d584a',
          800: '#70463c',
          900: '#5a3a32',
        },
        teal: {
          50: '#effbf9',
          100: '#d7f5ee',
          200: '#b0ebe0',
          300: '#7ddccc',
          400: '#43c4b5',
          500: '#1fa89a',
          600: '#158781',
          700: '#146c69',
          800: '#145657',
          900: '#134848',
        },
        emerald: {
          50: '#edfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        ink: {
          900: '#1a1a1d',
          800: '#2d2d33',
          700: '#45454d',
          600: '#62626b',
          500: '#7e7e88',
          400: '#9c9ca6',
          300: '#b8b8c0',
          200: '#d4d4da',
          100: '#e8e8ec',
          50: '#f4f4f6',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-down': 'fadeDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'marquee': 'marquee 28s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-left': 'slideLeft 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right': 'slideRight 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'count-up': 'countUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'story-progress': 'storyProgress linear forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(36px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-36px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.8)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        storyProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(184,130,106,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(184,130,106,0.7)' },
        },
      },
    },
  },
  plugins: [],
};
