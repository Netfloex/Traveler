import { z } from "zod"

import { ProductType } from "./Itinerary/Leg/Product"

import { Itinerary } from "@endpoints/ns/planner/PlannerSchema/Itinerary"
import { ItineraryLeg } from "@endpoints/ns/planner/PlannerSchema/Itinerary/Leg"

export const PlannerResultSchema = z
	.object({
		trips: z.array(Itinerary),
		scrollRequestBackwardContext: z.string(),
		scrollRequestForwardContext: z.string(),
	})
	.transform(
		({
			scrollRequestBackwardContext,
			scrollRequestForwardContext,
			...r
		}) => ({
			prevContext: scrollRequestBackwardContext,
			nextContext: scrollRequestForwardContext,
			...r,
		}),
	)

export type PlannerResult = z.output<typeof PlannerResultSchema>
export type Itinerary = z.output<typeof Itinerary>
export type ItineraryLeg = z.output<typeof ItineraryLeg>
export type ProductType = z.output<typeof ProductType>
