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
				'regular-DarkGray': '#212121',
				'regular-black': '#0F0F0F',
				'regular-violet': '#766AC8',
				'regular-LightGray': '#303030',
				'regular-PrettyGray': '#313131',
				'regular-BlurGray': '#9CA3AF',
				'regular-IconButton': '#414141',
				'regular-PlaceHolderText': '#9ca3af',
			},
			animation: {
				'grow-icon': 'GrowIconIn 0.4s forwards ease-out',
				'hide-icon': 'HideIconIn 0.4s forwards ease-out',
				'hide-placeholder': 'HidePlaceholder 0.3s forwards ease-in',
				'grow-placeholder': 'GrowPlaceholder 0.3s forwards ease-out',
			},
			keyframes: {
				'HidePlaceholder': {
					'0%': {
						opacity: '1',
						transform: 'translateX(0) translateY(-50%)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(20px) translateY(-50%)',
					},
				},
				'GrowPlaceholder': {
					'0%': {
						opacity: '0',
						transform: 'translateX(20px) translateY(-50%)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) translateY(-50%)',
					},
				},
				'GrowIconIn': {
					'0%': {
						transform: 'scale(0.5)',
						opacity: '0.8',
					},
					'50%': {
						transform: 'scale(1.1)',
						opacity: '1',
					},
					'100%': {
						transform: 'scale(1)',
					}
				},
				'HideIconIn': {
					'0%': {
						transform: 'scale(1)',
						opacity: '0.4',
					},
					'100%': {
						transform: 'scale(0.5)',
						opacity: '0',
					}
				}
			}
		},
	},
	plugins: [],

	// corePlugins: {
	// 	preflight: false,
	// }
}
export default config
