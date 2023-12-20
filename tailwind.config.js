/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', '[data-mode="dark"]'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'black-alpha-10': 'rgba(0, 0, 0, 0.1)',
				'black-alpha-20': 'rgba(0, 0, 0, 0.2)',
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [],
}
