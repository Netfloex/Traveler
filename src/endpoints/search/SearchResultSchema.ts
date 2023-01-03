import { z } from "zod";

const GPSLocation = z.object({
	latitude: z.number(),
	longitude: z.number()
});

const GenericLocation = z.object({
	name: z.string(),
	location: GPSLocation
});

const TransitLocationType = z.enum([
	"busStation",
	"combiMetroTram",
	"combiTramBus",
	"ferryPort",
	"metroStation",
	"onstreetBus",
	"onstreetTram",
	"other",
	"railStation",
	"tramStation"
]);
const TransitLocation = GenericLocation.extend({
	stopid: z.string(),
	type: TransitLocationType,
	city: z.string()
});

const GeneralLocationType = z.enum([
	"amenity",
	"building",
	"club",
	"highway",
	"historic",
	"landuse",
	"leisure",
	"man_made",
	"mountain_pass",
	"natural",
	"office",
	"other",
	"place",
	"railway",
	"shop",
	"tourism"
]);

const GeneralLocation = GenericLocation.extend({
	country: z.string(),
	detailedType: z.string().optional(),
	type: GeneralLocationType.and(z.string()),
	city: z.string().optional()
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const locationWrapper = (
	location: typeof TransitLocation | typeof GeneralLocation
) => {
	return z.array(
		location.transform((loc) => ({
			...loc,
			id: `${loc.location.latitude}${loc.location.longitude}${loc.name}${loc.type}`
		}))
	);
};

export const SearchResultSchema = z
	.object({
		result: z
			.object({
				transit: locationWrapper(TransitLocation),
				general: locationWrapper(GeneralLocation)
			})
			.partial(),
		statusCode: z.number().refine((s) => s == 200)
	})
	.transform((resp) => resp.result);

export type SearchResult = z.output<typeof SearchResultSchema>;
export type GeneralLocation = Required<SearchResult>["general"][0];
export type TransitLocation = Required<SearchResult>["transit"][0];
export type LocationUnion = TransitLocation | GeneralLocation;

export type GeneralLocationType = z.output<typeof GeneralLocationType>;
export type TransitLocationType = z.output<typeof TransitLocationType>;
