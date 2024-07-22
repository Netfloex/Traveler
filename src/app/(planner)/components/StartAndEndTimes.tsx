import { DateTime } from "luxon"
import { MdArrowForward } from "react-icons/md"

import SvgIcon from "@mui/joy/SvgIcon"
import Typography from "@mui/joy/Typography"

import { Itinerary } from "@endpoints/ns/planner/PlannerSchema"

import type { FC } from "react"

export const StartAndEndTimes: FC<{ itinerary: Itinerary }> = ({
	itinerary,
}) => {
	return (
		<>
			<Typography endDecorator={<></>}>
				{itinerary.start.toLocaleString(DateTime.TIME_24_SIMPLE)}
			</Typography>
			<Typography startDecorator={<SvgIcon component={MdArrowForward} />}>
				{itinerary.end.toLocaleString(DateTime.TIME_24_SIMPLE)}
			</Typography>
		</>
	)
}
