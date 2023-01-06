import { DateTime } from "luxon"
import { FC, useCallback } from "react"

import { Divider, ListDivider } from "@mui/joy"
import Card from "@mui/joy/Card"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import TabPanel from "@mui/joy/TabPanel"
import Typography from "@mui/joy/Typography"

import { locationToString } from "@utils/locationToString"

import { Duration } from "../Duration"
import { ModeTypeToIcon } from "../ModeTypeToIcon"
import { StartAndEndTimes } from "../StartAndEndTimes"

import { Itinerary } from "@endpoints/planner/PlannerResultSchema"
import { LocationUnion } from "@endpoints/search/SearchResultSchema"

export const LocationItem: FC<{
	location: LocationUnion
	time: DateTime
}> = ({ location, time }) => {
	return (
		<ListItem>
			<Typography
				startDecorator={time.toLocaleString(DateTime.TIME_24_SIMPLE)}
			>
				{locationToString(location)}
			</Typography>
		</ListItem>
	)
}

export const ItineraryPanel: FC<{
	itinerary: Itinerary
	departure: LocationUnion
	destination: LocationUnion
}> = ({ itinerary, departure, destination }) => {
	const nextLeg = useCallback(
		(i: number) => itinerary.legs.at(i + 1),
		[itinerary.legs],
	)

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
						day: "numeric",
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
						// Do not render if this is the final destination
						nextLeg(i) && (
							// end station
							<ListItem key={leg.id + "endStation"}>
								<div>
									<Typography
										startDecorator={leg.endTime.toLocaleString(
											DateTime.TIME_24_SIMPLE,
										)}
									>
										{leg.to.name}
									</Typography>
									{/*  Start time for next department*/}
									{nextLeg(i) !== undefined &&
										!nextLeg(i)!.startTime.equals(
											leg.endTime,
										) &&
										nextLeg(i)!.startTime.toFormat("T")}
								</div>
								{nextLeg(i) &&
									nextLeg(i)!.from.platformCode && (
										<Typography
											marginLeft="auto"
											level="body2"
										>
											platform{" "}
											{nextLeg(i)!.from.platformCode}
										</Typography>
									)}
							</ListItem>
						),
					])}

					{/* Destination */}
					<LocationItem
						time={itinerary.endTime}
						location={destination}
					/>
				</List>
			</Card>
		</TabPanel>
	)
}
