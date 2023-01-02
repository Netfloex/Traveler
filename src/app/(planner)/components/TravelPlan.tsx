import { FC, useEffect, useState } from "react";
import useSWR from "swr";

import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

import { planner, PlannerOptions } from "@endpoints/planner";
import { LocationUnion } from "@endpoints/search/SearchResultSchema";
import { DateTime } from "luxon";

export const TravelPlan: FC<{
	departure: LocationUnion;
	destination: LocationUnion;
}> = ({ departure, destination }) => {
	const [date] = useState(DateTime.now());
	const { data, error, isLoading } = useSWR(
		{ date, departure, destination } satisfies PlannerOptions,
		planner
	);

	useEffect(() => {
		if (error) console.error(error);
	}, [error]);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignContent: "center"
			}}
		>
			<>
				{isLoading && <CircularProgress />}
				{data && <pre>{JSON.stringify(data, null, "\t")}</pre>}
			</>
		</Box>
	);
};
