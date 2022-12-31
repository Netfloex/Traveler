import { FC } from "react";

import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

import { LocationUnion } from "@endpoints/search/SearchResultSchema";

export const TravelPlan: FC<{
	departure: LocationUnion;
	destination: LocationUnion;
}> = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignContent: "center"
			}}
		>
			<CircularProgress />
		</Box>
	);
};
