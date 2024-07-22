import { z } from "zod"

import { generateID } from "@utils/genereteID"

import { LegLocation } from "@endpoints/ns/planner/PlannerSchema/Itinerary/Leg/LegLocation"
import { Product } from "@endpoints/ns/planner/PlannerSchema/Itinerary/Leg/Product"
import { minutesDuration } from "@endpoints/ns/planner/PlannerSchema/utils"

export const ItineraryLeg = z
	.object({
		name: z.string().optional(),
		cancelled: z.boolean(),
		direction: z.string().optional(),
		origin: LegLocation,
		destination: LegLocation,
		product: Product,
		plannedDurationInMinutes: minutesDuration,
	})
	.transform(({ plannedDurationInMinutes, ...l }) => ({
		id: generateID(),
		duration: plannedDurationInMinutes,
		actualStart: l.origin.actualDateTime,
		actualEnd: l.destination.actualDateTime,
		plannedStart: l.origin.plannedDateTime,
		plannedEnd: l.destination.plannedDateTime,
		...l,
	}))
	.transform((l) => ({
		start: (l.actualStart ?? l.plannedStart)!,
		end: (l.actualEnd ?? l.plannedEnd)!,
		...l,
	}))
