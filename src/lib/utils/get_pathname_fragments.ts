export default function (pathname: string): string[] {
	return pathname?.split('/')?.filter(Boolean) ?? []
}
