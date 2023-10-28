/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        white100: '#D9D9D9',
        black: '#000',
        black300: '#131316',
        gray40: '#56616B',
        gray50: '#EFF1F6',
        gray100: '#DBDEE5',
        gray400: '#56616B',
        green100: '#E3FCF2',
        green500: '#075132',
        red100: '#F9E3E0',
        red400: '#961100',
      },
      boxShadow: {
        light100: '0px 2px 4px 0px rgba(45, 59, 67, 0.05), 0px 2px 6px 0px rgba(45, 59, 67, 0.06)',
        appBar: '0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08)',
        thickShadow: '0px 8px 16px 4px rgba(188, 196, 204, 0.10), 0px 12px 24px 0px rgba(219, 222, 229, 0.10), 0px 16px 32px 0px rgba(219, 222, 229, 0.10);',
      },
    },
  },
  plugins: [],
}

