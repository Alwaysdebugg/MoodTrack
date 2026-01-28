export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#007AFF',
        'apple-gray': '#F2F2F7',
        'apple-text': '#1D1D1F',
        'apple-secondary': '#86868B',
      },
      fontFamily: {
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'apple': '1.25rem',
        'apple-lg': '1.5rem',
      },
      boxShadow: {
        'apple': '0 2px 16px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'apple-xl': '0 16px 48px rgba(0, 0, 0, 0.16)',
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
}