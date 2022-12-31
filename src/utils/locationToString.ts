import { LocationUnion } from "@endpoints/search/SearchResultSchema";

export const locationToString = (location: LocationUnion): string => {
	const addition = "city" in location ? location.city : location.country;

	return (
		location.name +
		(!addition || location.name.match(addition) ? "" : `, ${addition}`)
	);
};
