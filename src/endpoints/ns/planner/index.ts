import { DateTime } from "luxon"
import { Fetcher } from "swr"

import { nsApi } from "../nsApi"
import { PlannerResult, PlannerResultSchema } from "./PlannerSchema"

import { LocationUnion } from "@endpoints/breng/search/SearchResultSchema"

export interface PlannerOptions {
	date: DateTime
	departure: LocationUnion
	destination: LocationUnion
}
// https://apiportal.ns.nl/docs/services/reisinformatie-api/operations/getTravelAdvice?
export const planner: Fetcher<PlannerResult, PlannerOptions> = async ({
	date,
	departure,
	destination,
}) => {
	// const timeString = date.toFormat("T")
	// const dateString = date.toFormat("dd-MM-y")

	const response = await nsApi
		.get("reisinformatie-api/api/v3/trips", {
			searchParams: {
				// lang: "nl"
				fromStation: departure.city,
				toStation: destination.city,
				searchForArrival: false,
				dateTime: date.set({ millisecond: 0 }).toISO({
					suppressMilliseconds: true,
					includeOffset: false,
				}),
			},
		})

		.json<PlannerResult>()

	const parsed = PlannerResultSchema.safeParse(response)

	if (parsed.success) {
		console.log(parsed.data)
		return parsed.data
	}

	console.error("Error validating planner response: ", {
		date,
		departure,
		destination,
	})

	throw parsed.error
}
