import { DateTime } from "luxon"
import { Fetcher } from "swr"

import { PlannerResult } from "./PlannerResultSchema"

import { brengApi } from "@endpoints/brengApi"
import { PlannerResultSchema } from "@endpoints/planner/PlannerResultSchema"
import { LocationUnion } from "@endpoints/search/SearchResultSchema"

export interface PlannerOptions {
	date: DateTime
	departure: LocationUnion
	destination: LocationUnion
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const locationUnionToPlannerLocation = (location: LocationUnion) => ({
	description: location.name,
	lat: location.location.latitude,
	lng: location.location.longitude,
})

export const planner: Fetcher<PlannerResult, PlannerOptions> = async ({
	date,
	departure,
	destination,
}) => {
	const timeString = date.toFormat("T")
	const dateString = date.toFormat("dd-MM-y")

	const response = await brengApi
		.get("travelplanner/planner", {
			searchParams: {
				arrive: false,
				time: timeString,
				date: dateString,
				from: JSON.stringify(locationUnionToPlannerLocation(departure)),
				to: JSON.stringify(locationUnionToPlannerLocation(destination)),
			},
		})

		.json<PlannerResult>()

	const parsed = PlannerResultSchema.safeParse(response)

	if (parsed.success) {
		return parsed.data
	}

	console.error("Error validating planner response: ", {
		date,
		departure,
		destination,
	})

	throw parsed.error
}
