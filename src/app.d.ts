declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: string | undefined
		}
		interface PageData {
			locale: string | undefined
			seo: ISeoTemplate
		}
		// interface Platform {}
	}
}

export {}
