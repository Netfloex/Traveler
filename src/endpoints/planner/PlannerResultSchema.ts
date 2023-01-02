import { DateTime, Duration } from "luxon";
import { z } from "zod";

const unixDate = z.number().transform((unix) => DateTime.fromMillis(unix));
const durationSeconds = z
	.number()
	.transform((seconds) => Duration.fromMillis(seconds * 1000));

const TravelMode = z.enum(["WALK", "BUS", "RAIL", "TRAM", "SUBWAY"]);

const LegFromOrTo = z.object({
	arrival: z.number().optional(),
	departure: z.number().optional(),
	lat: z.number(),
	lon: z.number(),
	name: z.string(),
	platformCode: z.string().optional(),
	stopId: z.string().optional(),
	stopCode: z.string().optional()
});

const ItineraryLeg = z.object({
	arrivalDelay: durationSeconds,
	departureDelay: durationSeconds,
	startTime: unixDate,
	endTime: unixDate,
	mode: TravelMode,
	routeShortName: z.string().optional(),
	tripId: z.string().optional(),
	// intermediateStops: z.array().optional(),
	from: LegFromOrTo,
	to: LegFromOrTo
});

const Itinerary = z.object({
	startTime: unixDate,
	endTime: unixDate,
	legs: z.array(ItineraryLeg),
	transitTime: durationSeconds,
	walkTime: durationSeconds,
	duration: durationSeconds
});

export const PlannerResultSchema = z
	.object({
		result: z.object({
			result: z.object({
				plan: z.object({
					itineraries: z.array(Itinerary)
				})
			})
		}),
		statusCode: z.number().refine((s) => s == 200)
	})
	.transform((resp) => resp.result.result);
