declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale?: string
		}
		interface PageData {
			locale?: string
			seo?: ISeoTemplate
		}
		// interface Platform {}
	}
}

export {}
