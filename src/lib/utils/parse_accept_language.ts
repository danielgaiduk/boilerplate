export default function (header_languages: string): string {
	const filtered_languages: LanguageCollection[] = []

	for (const header_language of header_languages?.split(',') || []) {
		const [full_language, rating = '1'] = header_language.split(';q=')
		const [language] = full_language.split('-')

		if (language && rating) {
			filtered_languages.push({ language, rating: parseFloat(rating) })
		}
	}

	return filtered_languages?.sort((a, b) => b?.rating - a?.rating)?.[0]?.language
}
