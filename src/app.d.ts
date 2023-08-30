type Pocketbase = import('pocketbase').default

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: string
			pb: Pocketbase
			user: Pocketbase.authStore.model
		}
		interface PageData {
			locale: string
			title?: string
			description?: string
		}
		// interface Platform {}
	}
	type LanguageCollection = {
		language: string
		rating: number
	}
	type Temporal = [number, 'day' | 'month' | 'year']
	type Cookie = Record<string, string>
	type AlternateLinks = {
		href: string
		hreflang: string
	}
}

export {}
