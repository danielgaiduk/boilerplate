export default function (string: string): string {
	return string?.replace(/\s+/g, '-')?.toLowerCase()
}
