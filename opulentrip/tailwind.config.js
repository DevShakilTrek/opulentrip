/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',        // Tailwind blue-600
        'primary-dull': '#1e40af', // Tailwind blue-800 for hover
      },
    },
  },
  plugins: [],
}
