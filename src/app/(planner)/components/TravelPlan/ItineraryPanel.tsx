import { DateTime } from "luxon";
import { FC } from "react";

import Card from "@mui/joy/Card";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";

import { Duration } from "../Duration";
import { ModeTypeToIcon } from "../ModeTypeToIcon";
import { StartAndEndTimes } from "../StartAndEndTimes";

import { Itinerary } from "@endpoints/planner/PlannerResultSchema";
import { LocationUnion } from "@endpoints/search/SearchResultSchema";
import { Divider, ListDivider } from "@mui/joy";
import { locationToString } from "@utils/locationToString";

export const LocationItem: FC<{
	location: LocationUnion;
	time: DateTime;
}> = ({ location, time }) => {
	return (
		<ListItem>
			<Typography
				startDecorator={time.toLocaleString(DateTime.TIME_24_SIMPLE)}
			>
				{locationToString(location)}
			</Typography>
		</ListItem>
	);
};

export const ItineraryPanel: FC<{
	itinerary: Itinerary;
	departure: LocationUnion;
	destination: LocationUnion;
}> = ({ itinerary, departure, destination }) => {
	return (
		<TabPanel value={itinerary.id}>
			<Card variant="soft">
				<Typography level="h2" fontSize="md" display="flex">
					<StartAndEndTimes itinerary={itinerary} />
					<Duration duration={itinerary.duration} />
				</Typography>
				<Typography level="body2">
					{itinerary.startTime.toLocaleString({
						weekday: "short",
						month: "long",
						day: "numeric"
					})}
				</Typography>
				<Divider />
				<List>
					{/* Departure */}

					<LocationItem
						time={itinerary.startTime}
						location={departure}
					/>
					{itinerary.legs.map((leg, i) => [
						<ListDivider key={leg.id + "divider"} />,
						<ListItem key={leg.id}>
							<Typography
								startDecorator={
									<ModeTypeToIcon
										fontSize="xl3"
										mode={leg.mode}
									/>
								}
								level="body2"
							>
								{leg.mode == "WALK" ? (
									<Typography>
										{leg.duration.rescale().toHuman({})}
									</Typography>
								) : (
									<span>
										<Typography display="block">
											{leg.agencyName}{" "}
											{leg.routeShortName}
										</Typography>
										{leg.headsign && (
											<Typography
												level="body3"
												display="block"
											>
												heading to
												<> </>
												{leg.headsign}
											</Typography>
										)}
										<Typography level="body3">
											<Duration duration={leg.duration} />
										</Typography>
									</span>
								)}
							</Typography>
						</ListItem>,
						<ListDivider key={leg.id + "divider2"} />,
						itinerary.legs.length - 1 !== i && (
							// end station
							<ListItem key={leg.id + "endStation"}>
								<div>
									<Typography
										startDecorator={leg.endTime.toLocaleString(
											DateTime.TIME_24_SIMPLE
										)}
									>
										{leg.to.name}
									</Typography>
									{/*  Start time for next department*/}
									{itinerary.legs.length > i + 1 &&
										!itinerary.legs[i + 1].startTime.equals(
											leg.endTime
										) && (
											<Typography>
												{itinerary.legs[
													i + 1
												].startTime.toFormat("T")}
											</Typography>
										)}
								</div>
							</ListItem>
						)
					])}

					{/* Destination */}
					<LocationItem
						time={itinerary.endTime}
						location={destination}
					/>
				</List>
			</Card>
		</TabPanel>
	);
};
