import styles from "./TravelPlan.module.scss";

import { DateTime } from "luxon";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

import CircularProgress from "@mui/joy/CircularProgress";
import ListDivider from "@mui/joy/ListDivider";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import Typography from "@mui/joy/Typography";

import { ItineraryPanel } from "./ItineraryPanel";
import { ItineraryTab } from "./ItineraryTab";

import { planner, PlannerOptions } from "@endpoints/planner";
import { LocationUnion } from "@endpoints/search/SearchResultSchema";
import { SvgIcon } from "@mui/joy";
import Alert from "@mui/joy/Alert";
import { MdWarning } from "react-icons/md";

export const TravelPlan: FC<{
	departure: LocationUnion;
	destination: LocationUnion;
}> = ({ departure, destination }) => {
	const [date] = useState(DateTime.now().set({ hour: 12 }));
	const { data, error, isLoading } = useSWR(
		{ date, departure, destination } satisfies PlannerOptions,
		planner
	);

	useEffect(() => {
		if (error) console.error(error);
	}, [error]);

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<CircularProgress />
			</div>
		);
	} else if (error) {
		return (
			<>
				<Alert
					color="danger"
					startDecorator={<SvgIcon component={MdWarning} />}
				>
					Error fetching travel advice:
				</Alert>
				<Typography>{String(error)}</Typography>
				{"stack" in error && <pre>{error.stack}</pre>}
			</>
		);
	}

	const { itineraries } = data!.plan;

	if (!itineraries.length) {
		return <>No itineraries</>;
	}

	return (
		<Tabs
			orientation="vertical"
			defaultValue={itineraries[0].id}
			className={styles.tabs}
		>
			<TabList className={styles.tabList}>
				{itineraries
					.flatMap((itinerary) => [
						<ItineraryTab
							key={itinerary.id}
							itinerary={itinerary}
						/>,
						<ListDivider key={itinerary.id + "hr"} />
					])
					.slice(0, -1)}
			</TabList>
			{itineraries.map((itinerary) => (
				<ItineraryPanel key={itinerary.id} itinerary={itinerary} />
			))}
		</Tabs>
	);
};