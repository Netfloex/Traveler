import { DateTime, Duration } from "luxon"
import { z } from "zod"

const unixDate = z.number().transform((unix) => DateTime.fromMillis(unix))
const durationSeconds = z
	.number()
	.transform((seconds) => Duration.fromMillis(seconds * 1000))

const TravelMode = z.enum(["WALK", "BUS", "RAIL", "TRAM", "SUBWAY"])

const LegFromOrTo = z.object({
	arrival: unixDate.optional(),
	departure: unixDate.optional(),
	lat: z.number(),
	lon: z.number(),
	name: z.string(),
	platformCode: z.string().optional(),
	stopId: z.string().optional(),
	stopCode: z.string().optional(),
})

const ItineraryLeg = z
	.object({
		arrivalDelay: durationSeconds,
		agencyName: z.string().optional(),
		departureDelay: durationSeconds,
		duration: durationSeconds,
		endTime: unixDate,
		from: LegFromOrTo,
		// intermediateStops: z.array().optional(),
		headsign: z.string()?.optional(),
		mode: TravelMode,
		routeShortName: z.string().optional(),
		startTime: unixDate,
		to: LegFromOrTo,
		tripId: z.string().optional(),
	})
	.transform((leg) => ({
		...leg,
		id: `${leg.startTime}${leg.endTime}${leg.routeShortName ?? ""}${
			leg.tripId ?? ""
		}`,
	}))

const Itinerary = z
	.object({
		startTime: unixDate,
		endTime: unixDate,
		legs: z
			.array(ItineraryLeg)
			.transform((legs) =>
				legs.filter(
					(leg) =>
						!(leg.mode === "WALK" && leg.from.name === leg.to.name),
				),
			),
		transitTime: durationSeconds,
		walkTime: durationSeconds,
		duration: durationSeconds,
	})
	.transform((itinerary) => ({
		...itinerary,
		startTime: itinerary.legs[0].startTime,
		endTime: itinerary.legs[itinerary.legs.length - 1].endTime,
		id: `${itinerary.startTime}${itinerary.endTime}`,
	}))

export const PlannerResultSchema = z
	.object({
		result: z.object({
			result: z.object({
				plan: z.object({
					itineraries: z.array(Itinerary),
				}),
			}),
		}),
		statusCode: z.number().refine((s) => s == 200),
	})
	.transform((resp) => resp.result.result)

export type PlannerResult = z.output<typeof PlannerResultSchema>
export type Itinerary = z.output<typeof Itinerary>
export type ItineraryLeg = z.output<typeof ItineraryLeg>
export type TravelMode = z.output<typeof TravelMode>
