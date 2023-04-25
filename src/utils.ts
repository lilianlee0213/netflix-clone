export const netflixLogoUrl =
	'https://images.ctfassets.net/y2ske730sjqp/2e4W8sQrJTX5i1wceNpCSE/1b34a6c6fe12ce9fb7553d33cf6b80f2/BrandAssets_Logos_07-Avoid_01-NSymbol_03.jpg?w=500';

export function makeImagePath(id: string, format?: string) {
	return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
}
