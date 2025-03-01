/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'custom-gradient': 'linear-gradient(270deg, #C3105F 0%, #3073DF 98.88%)',
        'mainColor':'#8B5E35',
        'secondColor':'#9B7E5C',
        'thirdColor':'#F1F1F1',
        'fourthColor':'#EEEEEE',
        'TextColor':'#090F41',
        'footerbg':'#2E2E2E',
        'font2nd':'#F6F6F6',
        'font3nd':'#090F41',
        'font4nd':'#9D9DAA'
      },

    },
    
  },
  plugins: [
    require('flowbite/plugin')

  ],
}

