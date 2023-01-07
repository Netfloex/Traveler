import { DateTime } from "luxon"
import { FC } from "react"

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

import { Itinerary, ItineraryLeg } from "@endpoints/planner/PlannerResultSchema"
import { LocationUnion } from "@endpoints/search/SearchResultSchema"

const LocationItem: FC<{
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

const LegItem: FC<{ leg: ItineraryLeg; nextLeg?: ItineraryLeg }> = ({
	leg,
	nextLeg,
}) => {
	return (
		<>
			<ListDivider />
			<ListItem>
				<Typography
					startDecorator={
						<ModeTypeToIcon fontSize="xl3" mode={leg.mode} />
					}
					level="body3"
				>
					{leg.mode == "WALK" ? (
						<Typography>
							{leg.duration.rescale().toHuman({})}
						</Typography>
					) : (
						<span>
							<Typography level="body2" display="block">
								{leg.agencyName} {leg.routeShortName}
							</Typography>
							{leg.headsign && (
								<div>
									heading to
									<> </>
									{leg.headsign}
								</div>
							)}
							<div>
								<Duration duration={leg.duration} />
							</div>
						</span>
					)}
				</Typography>
			</ListItem>
			<ListDivider />
			{/* // Do not render if this is the final destination */}
			{nextLeg && (
				// end station
				<ListItem>
					<div>
						<Typography
							startDecorator={leg.endTime.toLocaleString(
								DateTime.TIME_24_SIMPLE,
							)}
						>
							{leg.to.name}
						</Typography>
						{/*  Start time for next department*/}
						{!nextLeg.startTime.equals(leg.endTime) && (
							<span>{nextLeg.startTime.toFormat("T")}</span>
						)}
					</div>
					{nextLeg.from.platformCode && (
						<Typography marginLeft="auto" level="body2">
							platform {nextLeg.from.platformCode}
						</Typography>
					)}
				</ListItem>
			)}
		</>
	)
}

export const ItineraryPanel: FC<{
	itinerary: Itinerary
	departure: LocationUnion
	destination: LocationUnion
	i: number
}> = ({ itinerary, departure, destination, i }) => {
	return (
		<TabPanel value={i}>
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

					{itinerary.legs.map((leg, i) => (
						<LegItem
							key={leg.id}
							leg={leg}
							nextLeg={itinerary.legs.at(i + 1)}
						/>
					))}

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
