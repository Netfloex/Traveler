import { z } from "zod"

export const ProductType = z.enum([
	"TRAIN",
	"BUS",
	"TRAM",
	"METRO",
	"FERRY",
	"WALK",
	"BIKE",
	"CAR",
	"TAXI",
	"SUBWAY",
	"SHARED_MODALITY",
	"UNKNOWN",
])

export const Product = z.object({
	type: ProductType,
	displayName: z.string().optional(),
	number: z.string().optional(),
	longCategoryName: z.string().optional(),
})
