/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563eb',
          dark: '#60a5fa',
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        secondary: {
          light: '#f8f9fa',
          dark: '#1e293b',
        },
        text: {
          primary: {
            light: '#1a1a2e',
            dark: '#f1f5f9',
          },
          secondary: {
            light: '#6c757d',
            dark: '#94a3b8',
          },
        },
        border: {
          light: '#e5e7eb',
          dark: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
