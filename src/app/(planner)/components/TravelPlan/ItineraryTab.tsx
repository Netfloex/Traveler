import styles from "./ItineraryTab.module.scss"

import { FC } from "react"
import { MdChevronRight } from "react-icons/md"

import ListItemContent from "@mui/joy/ListItemContent"
import SvgIcon from "@mui/joy/SvgIcon"
import Tab from "@mui/joy/Tab"
import Typography from "@mui/joy/Typography"

import { Duration } from "../Duration"
import { ModeTypeToIcon } from "../ModeTypeToIcon"
import { StartAndEndTimes } from "../StartAndEndTimes"

import { Itinerary } from "@endpoints/planner/PlannerResultSchema"

export const ItineraryTab: FC<{ itinerary: Itinerary }> = ({ itinerary }) => {
	return (
		<Tab value={itinerary.id}>
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
							startDecorator={<ModeTypeToIcon mode={leg.mode} />}
							endDecorator={
								i + 1 !== length ? (
									<SvgIcon component={MdChevronRight} />
								) : undefined
							}
						>
							{leg.routeShortName ??
								leg.duration.as("minutes").toFixed(0) + " min"}
						</Typography>
					))}
				</Typography>
			</ListItemContent>
		</Tab>
	)
}
