import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				kanit: ['var(--font-kanit)'],
			},
			colors: {
				primary: '#fd4350',
				'secondary-lt': '#3C393F',
				secondary: '#252329',
				'secondary-dk': '#120F13',
				'secondary-dks': '#0B090C',
				tertiary: '#f6f6f6',
				'tertiary-dk': '#828282',
			},
		},
	},
	plugins: [],
};
export default config;
