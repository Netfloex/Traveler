import styles from "./ItineraryTab.module.scss";

import { DateTime } from "luxon";
import { FC } from "react";
import { MdArrowForward, MdChevronRight, MdSchedule } from "react-icons/md";

import ListItemContent from "@mui/joy/ListItemContent";
import SvgIcon from "@mui/joy/SvgIcon";
import Tab from "@mui/joy/Tab";
import Typography from "@mui/joy/Typography";

import { ModeTypeToIcon } from "../ModeTypeToIcon";

import { Itinerary } from "@endpoints/planner/PlannerResultSchema";

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
						{itinerary.startTime.toLocaleString(
							DateTime.TIME_24_SIMPLE
						)}

						<SvgIcon component={MdArrowForward} />

						{itinerary.endTime.toLocaleString(
							DateTime.TIME_24_SIMPLE
						)}
					</Typography>

					<Typography
						className={styles.duration}
						startDecorator={<SvgIcon component={MdSchedule} />}
						noWrap
					>
						{itinerary.duration.toFormat("h:mm")}
					</Typography>
				</div>
				<Typography level="body2" noWrap>
					{itinerary.legs.map((leg, i, { length }) => (
						<Typography
							key={leg.id}
							startDecorator={
								<ModeTypeToIcon
									key={JSON.stringify(leg)}
									type={leg.mode}
								/>
							}
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
	);
};
