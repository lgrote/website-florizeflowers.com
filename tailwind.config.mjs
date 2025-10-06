/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'florize-green': {
          DEFAULT: '#4a7c59',
          dark: '#3d6849',
          light: '#5a8f6a'
        },
        'bloom-pink': {
          DEFAULT: '#e8b4cb',
          dark: '#d99bb9',
          light: '#f0c9dc'
        },
        'cream-white': '#faf8f3',
        'accent-gold': {
          DEFAULT: '#d4af37',
          dark: '#b89530',
          light: '#e0c560'
        },
        charcoal: '#2c2c2c'
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif']
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1280px'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2c2c2c',
            maxWidth: '800px',
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
