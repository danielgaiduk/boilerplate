export default function (headerLanguage: string): string {
	const filteredLanguages: { language: string; rating: number }[] = []

	for (const acceptedLanguage of headerLanguage?.split(',') || []) {
		const [fullLanguage, rating = '1'] = acceptedLanguage.split(';q=')
		const [language] = fullLanguage.split('-')

		if (language && rating) {
			filteredLanguages.push({ language, rating: parseFloat(rating) })
		}
	}

	return filteredLanguages?.sort((a, b) => b?.rating - a?.rating)?.[0]?.language
}
