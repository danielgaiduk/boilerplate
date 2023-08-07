import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [aspectRatio, containerQueries, forms, typography]
}

export default config
