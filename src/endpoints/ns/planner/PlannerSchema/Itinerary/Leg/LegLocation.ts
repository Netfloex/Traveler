import { z } from "zod"

import { isoDate } from "@endpoints/ns/planner/PlannerSchema/utils"

export const LegLocation = z.object({
	actualDateTime: isoDate.optional(),
	plannedDateTime: isoDate.optional(),
	name: z.string(),
	actualTrack: z.string().optional(),
	exitSide: z.enum(["LEFT", "RIGHT", "UNKNOWN"]).optional(),
})

export type LegLocation = z.output<typeof LegLocation>
