import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/flowbite-react/**/*.js',
		'./src/materials/*.{js,ts,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			'sans': ['ui-sans-serif', 'system-ui'],
			'serif': ['ui-serif', 'Georgia'],
			'mono': ['ui-monospace', 'SFMono-Regular'],
			'nunito': ['Nunito', 'sans-serif'],
			'roboto': ['Roboto', 'sans-serif'],
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'regular-bg-DarkGray': '#212121',
				'regular-bg-black': '#0F0F0F',
			}
		},
	},
	plugins: [],

	// corePlugins: {
	// 	preflight: false,
	// }
}
export default config
