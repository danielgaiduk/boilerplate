export default function <T, K extends keyof T>(
	array: T[],
	property: K,
	sortOrder: 'asc' | 'desc' = 'asc'
): T[] {
	return array.slice().sort((a, b) => {
		const aValue = a[property]
		const bValue = b[property]

		if (sortOrder === 'asc') {
			if (aValue < bValue) return -1
			if (aValue > bValue) return 1
			return 0
		}
		if (aValue > bValue) return -1
		if (aValue < bValue) return 1
		return 0
	})
}
