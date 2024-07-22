import { z } from "zod"

import { ItineraryLeg } from "@endpoints/ns/planner/PlannerSchema/Itinerary/Leg"
import { minutesDuration } from "@endpoints/ns/planner/PlannerSchema/utils"

export const Itinerary = z
	.object({
		uid: z.string(),
		legs: z.array(ItineraryLeg),
		plannedDurationInMinutes: minutesDuration,
	})
	.transform(({ uid, plannedDurationInMinutes, ...i }) => ({
		id: uid,
		actualStart: i.legs.at(0)?.start,
		actualEnd: i.legs.at(-1)?.end,
		plannedStart: i.legs.at(0)?.start,
		plannedEnd: i.legs.at(-1)?.end,
		duration: plannedDurationInMinutes,

		...i,
	}))
	.transform((i) => ({
		start: (i.actualStart ?? i.plannedStart)!,
		end: (i.actualEnd ?? i.plannedEnd)!,
		...i,
	}))
