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
	type AlternateLinks = { href: string; hreflang: string }
	type Cookie = Record<string, string>
	type SelectedLanguage = { language: string; rating: number }
	type Temporal = [number, 'day' | 'month' | 'year']
}

export {}
