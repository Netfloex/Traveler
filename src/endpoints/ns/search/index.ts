import { DateTime } from "luxon"
import { Fetcher } from "swr"

import { nsApi } from "../nsApi"

interface SearchResult {}
// https://apiportal.ns.nl/docs/services/reisinformatie-api/operations/getTravelAdvice?
export const search = async (query: string): Promise<SearchResult> => {
	// const timeString = date.toFormat("T")
	// const dateString = date.toFormat("dd-MM-y")

	const response = await nsApi
		.get("places-api/v2/autosuggest", {
			searchParams: {
				q: query,
			},
		})

		.json<SearchResult>()
	console.log(response)

	return response

	// const parsed = SearchResultSchema.safeParse(response)

	// if (parsed.success) {
	// 	console.log(parsed.data)
	// 	return parsed.data
	// }

	// console.error("Error validating planner response: ", {
	// 	date,
	// 	departure,
	// 	destination,
	// })

	// throw parsed.error
}
