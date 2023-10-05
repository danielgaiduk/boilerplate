import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter var', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [aspectRatio, containerQueries, forms, typography]
}

export default config
