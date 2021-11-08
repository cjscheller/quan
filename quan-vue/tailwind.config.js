module.exports = {
	purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
	darkMode: 'class', // or 'media' or 'false'
	theme: {
		fontFamily: {
			'karla': ['Karla', 'sans-serif'],
		},
		fill: theme => ({
			'gray': theme('colors.gray.400'),
		}),
		extend: {
			height: {
				'fit': 'fit-content'
			},
			width: {
				'fit': 'fit-content',
				'inherit': 'inherit'
			},
			minWidth: {
				'80': '20rem',
				'96': '24rem'
			},
			zIndex: {
				'-1': '-1'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}