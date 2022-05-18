const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	purge: [
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	darkmode: false,
	theme: {
		extend: {},
	},
	plugins: [],
}
