module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0078d4',
          dark: '#005a9e',
        },
        secondary: {
          light: '#8c8c8c',
          DEFAULT: '#6e6e6e',
          dark: '#505050',
        },
        success: {
          light: '#7ae582',
          DEFAULT: '#4caf50',
          dark: '#388e3c',
        },
        warning: {
          light: '#ffdd57',
          DEFAULT: '#ffc107',
          dark: '#ffa000',
        },
        danger: {
          light: '#ff6b6b',
          DEFAULT: '#f44336',
          dark: '#d32f2f',
        },
      },
    },
  },
  plugins: [],
}
