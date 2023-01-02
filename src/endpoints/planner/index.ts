import { DateTime } from "luxon";
import { Fetcher } from "swr";

import { brengApi } from "@endpoints/brengApi";
import { LocationUnion } from "@endpoints/search/SearchResultSchema";
import { PlannerResultSchema } from "@endpoints/planner/PlannerResultSchema";

export interface PlannerOptions {
	date: DateTime;
	departure: LocationUnion;
	destination: LocationUnion;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const locationUnionToPlannerLocation = (location: LocationUnion) => ({
	description: location.name,
	lat: location.location.latitude,
	lng: location.location.longitude
});

export const planner: Fetcher<unknown, PlannerOptions> = async ({
	date,
	departure,
	destination
}) => {
	const timeString = date.toFormat("T");
	const dateString = date.toFormat("dd-MM-y");

	const response = await brengApi
		.get("travelplanner/planner", {
			searchParams: {
				arrive: false,
				time: timeString,
				date: dateString,
				from: JSON.stringify(locationUnionToPlannerLocation(departure)),
				to: JSON.stringify(locationUnionToPlannerLocation(destination))
			}
		})

		.json<unknown>();

	const parsed = PlannerResultSchema.safeParse(response);

	if (parsed.success) {
		return parsed.data;
	}

	console.error("Error validating planner response: ", {
		date,
		departure,
		destination
	});

	throw parsed.error;
};
