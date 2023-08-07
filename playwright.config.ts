import type { PlaywrightTestConfig } from '@playwright/test'

const PORT = 4173

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm build && pnpm preview',
		port: PORT
	},
	use: {
		baseURL: `https://localhost:${PORT}`
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
}

export default config