/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669', // Primary Brand Emerald
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          dark: '#022c22'
        },
        slate: {
          850: '#121e2e',
          950: '#090d16'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(16, 185, 129, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(5, 150, 105, 0.15)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.35)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'emerald-gradient': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.75) 100%)'
      }
    },
  },
  plugins: [],
};
