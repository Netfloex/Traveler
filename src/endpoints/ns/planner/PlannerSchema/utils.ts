import { DateTime, Duration } from "luxon"
import { z } from "zod"

export const isoDate = z.string().transform((str) => DateTime.fromISO(str))
export const minutesDuration = z
	.number()
	.transform((minutes) => Duration.fromObject({ minutes }))
