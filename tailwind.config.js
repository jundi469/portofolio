/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      visibility: ["group-hover"],
      backdropBlur: {
        xs: '2px',
      }
    },
    fontFamily: {
      bebas: ["Bebas Neue"],
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
