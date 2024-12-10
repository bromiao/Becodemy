/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./**/*.{js,jsx,ts,tsx}', '!./node_modules/**/*'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false // 这对于 Expo 很重要
  }
}
