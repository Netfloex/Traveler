import { DateTime } from "luxon"
import { FC, memo } from "react"

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

import { LocationUnion } from "@endpoints/breng/search/SearchResultSchema"
import { Itinerary, ItineraryLeg } from "@endpoints/ns/planner/PlannerSchema"

// const LocationItem: FC<{
// 	location: LocationUnion
// 	time: DateTime
// }> = ({ location, time }) => {
// 	return (
// 		<ListItem>
// 			<Typography
// 				startDecorator={time.toLocaleString(DateTime.TIME_24_SIMPLE)}
// 			>
// 				{locationToString(location)}
// 			</Typography>
// 		</ListItem>
// 	)
// }

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
						<ModeTypeToIcon
							fontSize="xl3"
							mode={leg.product.type}
						/>
					}
					level="body3"
				>
					{leg.product.type == "WALK" ? (
						<Typography>
							{leg.duration.rescale().toHuman({})}
						</Typography>
					) : (
						<span>
							<Typography level="body2" display="block">
								{leg.product.displayName} {leg.product.number}
							</Typography>
							{leg.direction && (
								<div>
									heading to
									<> </>
									{leg.direction}
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
			<ListItem>
				<div>
					<Typography
						startDecorator={leg.end.toLocaleString(
							DateTime.TIME_24_SIMPLE,
						)}
					>
						{leg.destination.name}
					</Typography>
					{/*  Start time for next department*/}
					{nextLeg && !nextLeg.start.equals(leg.end) && (
						<span>{nextLeg.start.toFormat("T")}</span>
					)}
				</div>
				{nextLeg?.origin.actualTrack && (
					<Typography marginLeft="auto" level="body2">
						platform {nextLeg.origin.actualTrack}
					</Typography>
				)}
			</ListItem>
		</>
	)
}

const UnmemoizedItineraryPanel: FC<{
	itinerary: Itinerary
	i: number
}> = ({ itinerary, i }) => (
	<TabPanel value={i}>
		<Card variant="soft">
			<Typography level="h2" fontSize="md" display="flex">
				<StartAndEndTimes itinerary={itinerary} />
				<Duration duration={itinerary.duration} />
			</Typography>
			<Typography level="body2">
				{itinerary.start?.toLocaleString({
					weekday: "short",
					month: "long",
					day: "numeric",
				})}
			</Typography>
			<Divider />
			<List>
				{/* Departure */}
				{/* <LocationItem time={itinerary.start} location={departure} /> */}

				<ListItem>
					<div>
						<Typography
							startDecorator={itinerary.legs[0].start.toLocaleString(
								DateTime.TIME_24_SIMPLE,
							)}
						>
							{itinerary.legs[0].origin.name}
						</Typography>
					</div>
				</ListItem>

				{itinerary.legs.map((leg, i) => (
					<LegItem
						key={leg.id}
						leg={leg}
						nextLeg={itinerary.legs.at(i + 1)}
					/>
				))}

				{/* Destination */}
				{/* <LocationItem time={itinerary.end} location={destination} /> */}
			</List>
		</Card>
	</TabPanel>
)

export const ItineraryPanel = memo(UnmemoizedItineraryPanel)
