/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        titillium: ['Titillium Web', 'sans-serif'],
        sourceSerif: ['Source Serif Pro', 'serif'],
      },
      colors: {
        solution: {
          bluegreen: '#088F8F',
          darkBluegreen: '#023020',
          tag: '#aaa',
          lightenGrey: '#ddd',
          fwBgGray: '#ccc',
          fwActiveGray: '#a1a1a1',
          gray: '#bbb',
          darkenGray: '#999',
          pageHoverBg: '#eceeef',
          tagCloudBg: '#f3f3f3',
          bgComClr: '#f5f5f5',
          tagItemBg: '#818a91',
          tagItemBgDarken: '#687877',
          black: '#373a3c',
          bgBlack: '#333',
          red: '#B85C5C',
        },
      },
      spacing: {
        0.3: '0.3rem',
        0.2: '0.2rem',
        navItem: '0.425rem',
        tag: '0.6rem',
        25: '6.25rem',
      },
      boxShadow: {
        banner:
          'inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%);',
      },
      dropShadow: {
        logo: '0px 1px 3px rgb(0 0 0 / 30%)',
      },
      fontSize: {
        logo: '3.5rem',
        date: '0.8rem',
        articleItem: '2.8rem',
        articleBody: '1.2rem',
      },
      borderRadius: {
        buttonSm: '0.2rem',
        tag: '10rem',
      },
      lineHeight: {
        articleTitle: '1.1',
        articleBody: '1.8rem',
      },
      opacity: {
        15: '0.15',
      },
    },
  },
  plugins: [],
}
