import { SearchResult, SearchResultSchema } from "./SearchResultSchema"

import { brengApi } from "@endpoints/breng/brengApi"

export const search = async (query: string): Promise<SearchResult> => {
	if (!query) {
		return { transit: [], general: [] }
	}

	const response = await brengApi
		.get("travelplanner/geo/search", {
			searchParams: {
				q: query.toLowerCase(),
			},
		})
		.json<SearchResult>()

	const parsed = SearchResultSchema.safeParse(response)

	if (parsed.success) {
		return parsed.data
	}

	console.error("Error validating search response, query : " + query)

	throw parsed.error
}
