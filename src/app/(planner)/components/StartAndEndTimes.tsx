import { DateTime } from "luxon"
import { MdArrowForward } from "react-icons/md"

import SvgIcon from "@mui/joy/SvgIcon"
import Typography from "@mui/joy/Typography"

import { Itinerary } from "@endpoints/planner/PlannerResultSchema"

import type { FC } from "react"

export const StartAndEndTimes: FC<{ itinerary: Itinerary }> = ({
	itinerary,
}) => {
	return (
		<>
			<Typography endDecorator={<></>}>
				{itinerary.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
			</Typography>
			<Typography startDecorator={<SvgIcon component={MdArrowForward} />}>
				{itinerary.endTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
			</Typography>
		</>
	)
}
