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
			backgroundSize: {
				'regular-bg-size-pattern': '510px auto',
				'regular-full-size': '100% 100%',
			},
			colors: {
				'regular-DarkGray': '#212121',
				'regular-black': '#0F0F0F',
				'regular-violet': '#766AC8',
				'regular-LightGray': '#303030',
				'regular-BlurGray': '#9CA3AF',
				'regular-IconButton': '#414141',
				'regular-PlaceHolderText': '#9ca3af',
				'regular-RecipientMsgTime': '#747474',
				'regular-CreatorMsgTime': '#d6c3e2',
			},
			animation: {
				'grow-icon': 'grow-icon 0.4s forwards ease-out',
				'hide-icon': 'hide-icon 0.4s forwards ease-out',
				'hide-placeholder': 'hide-placeholder 0.3s forwards ease-in',
				'grow-placeholder': 'grow-placeholder 0.3s forwards ease-out',
				'zoom-fade-in': 'zoom-in 0.15s forwards ease, fade-in 0.15s forwards ease',
				'zoom-fade-out': 'zoom-out 0.15s forwards ease, fade-out 0.15s forwards ease',
				'super-zoom-out-fade-in': 'super-zoom-out 0.15s forwards ease, fade-in 0.15s forwards ease',
				'super-zoom-in-fade-out': 'super-zoom-in 0.15s forwards ease, fade-out 0.15s forwards ease',
				'disappear-zoom-out-s40': 'disappear-zoom-out-s40 0.15s forwards linear',
				'appear-zoom-in-s40': 'appear-zoom-in-s40 0.15s forwards linear'
			},
			keyframes: {
				'disappear-zoom-out-s40': {
					'0%': {
						transform: 'scale(1)',
						width: '40px',
						height: '40px',
					},
					'100%': {
						transform: 'scale(0)',
						width: '0',
						height: '0',
					}
				},
				'appear-zoom-in-s40': {
					'0%': {
						transform: 'scale(0)',
						width: '0',
						height: '0',
					},
					'100%': {
						transform: 'scale(1)',
						width: '40px',
						height: '40px',
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
						display: 'initial',
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
					},
					'100%': {
						opacity: '0',
						display: 'none',
					}
				},
				'super-zoom-in': {
					'0%': {
						transform: 'scale(1)',
					},
					'100%': {
						transform: 'scale(1.05)',
					}
				},
				'super-zoom-out': {
					'0%': {
						transform: 'scale(1.05)',
					},
					'100%': {
						transform: 'scale(1)',
					}
				},
				'zoom-in': {
					'0%': {
						transform: 'scale(0.95)',
					},
					'100%': {
						transform: 'scale(1)',
					}
				},
				'zoom-out': {
					'0%': {
						transform: 'scale(1)',
					},
					'100%': {
						transform: 'scale(0.9)',
					}
				},
				'hide-placeholder': {
					'0%': {
						opacity: '1',
						transform: 'translateX(0) translateY(-50%)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(20px) translateY(-50%)',
					},
				},
				'grow-placeholder': {
					'0%': {
						opacity: '0',
						transform: 'translateX(20px) translateY(-50%)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) translateY(-50%)',
					},
				},
				'grow-icon': {
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
				'hide-icon': {
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
