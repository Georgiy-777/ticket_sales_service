export function getMediaSource(path: string) {
	return `${process.env.NEXT_PUBLIC_MEDIA_URL}${path}`
}
