const PORT = 4173

/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default {
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
