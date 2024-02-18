/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./contents/**/*.{tsx,html}"],
  darkMode: "media",
  prefix: "tutor-",
  daisyui: {
    themes: [
      {
        spring: {
          'primary': '#01937c',
          'primary-focus': '#017160',
          'primary-content': '#ffffff',

          'secondary': '#01937c',
          'secondary-focus': '#017160',
          'secondary-content': '#ffffff',

          'accent': '#01937c',
          'accent-focus': '#017160',
          'accent-content': '#ffffff',

          'neutral': '#ffcf96',
          'neutral-focus': '#ffc074',
          'neutral-content': '#2a4b46',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',

          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',

          '--rounded-box': '1rem',
          '--rounded-btn': '.5rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
      },
      {
        happy: {
          'primary': '#ff4d4d',
          'primary-focus': '#ff2b2b',
          'primary-content': '#ffffff',

          'secondary': '#ff8364',
          'secondary-focus': '#ff6842',
          'secondary-content': '#ffffff',

          'accent': '#fdb87d',
          'accent-focus': '#fca65c',
          'accent-content': '#ffffff',

          'neutral': '#fff1e6',
          'neutral-focus': '#ffe8d5',
          'neutral-content': '#1e2734',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',

          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',

          '--rounded-box': '1rem',
          '--rounded-btn': '.5rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
      },
    ],
    themeRoot: "*", // enable the themes
    styled: true,
  },
  plugins: [require("daisyui")],
}