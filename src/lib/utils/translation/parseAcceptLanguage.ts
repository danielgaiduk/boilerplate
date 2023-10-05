export default function (headerLanguages: string): string {
	let selectedLanguage: SelectedLanguage = { language: '', rating: 0 }

	for (const headerLanguage of headerLanguages?.split(',') || []) {
		const [fullLanguage, sourceRating = '1'] = headerLanguage.split(';q=')
		const [language] = fullLanguage.split('-')

		if (language && sourceRating) {
			const rating = parseFloat(sourceRating)

			if (rating > selectedLanguage.rating) {
				selectedLanguage = { language, rating }
			}
		}
	}

	return selectedLanguage?.language
}
