import styles from "./ItineraryTab.module.scss"

import { FC, memo } from "react"
import { MdChevronRight } from "react-icons/md"

import ListItemContent from "@mui/joy/ListItemContent"
import SvgIcon from "@mui/joy/SvgIcon"
import Tab from "@mui/joy/Tab"
import Typography from "@mui/joy/Typography"

import { Duration } from "../Duration"
import { ModeTypeToIcon } from "../ModeTypeToIcon"
import { StartAndEndTimes } from "../StartAndEndTimes"

import { Itinerary } from "@endpoints/ns/planner/PlannerSchema"

const UnmemoizedItineraryTab: FC<{
	itinerary: Itinerary
	i: number
}> = ({ itinerary, i }) => {
	return (
		<Tab value={i}>
			<ListItemContent>
				<div className={styles.title}>
					<Typography
						level="h2"
						fontSize="md"
						className={styles.time}
						noWrap
					>
						<StartAndEndTimes itinerary={itinerary} />
					</Typography>
					<Duration duration={itinerary.duration} />
				</div>
				<Typography level="body2" noWrap>
					{itinerary.legs.map((leg, i, { length }) => (
						<Typography
							key={leg.id}
							startDecorator={
								<ModeTypeToIcon mode={leg.product.type} />
							}
							endDecorator={
								i + 1 !== length ? (
									<SvgIcon component={MdChevronRight} />
								) : undefined
							}
						>
							{leg.product.longCategoryName ??
								leg.product.number ??
								leg.duration.as("minutes").toFixed(0) + " min"}
						</Typography>
					))}
				</Typography>
			</ListItemContent>
		</Tab>
	)
}

export const ItineraryTab = memo(UnmemoizedItineraryTab)
