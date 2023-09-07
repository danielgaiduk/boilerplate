export default function (header_languages: string): string {
	let selected_language: SelectedLanguage = { language: '', rating: 0 }

	for (const header_language of header_languages?.split(',') || []) {
		const [full_language, source_rating = '1'] = header_language.split(';q=')
		const [language] = full_language.split('-')

		if (language && source_rating) {
			const rating = parseFloat(source_rating)

			if (rating > selected_language.rating) {
				selected_language = { language, rating }
			}
		}
	}

	return selected_language?.language
}
