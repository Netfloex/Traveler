import { Duration as LuxonDuration } from "luxon"
import { MdSchedule } from "react-icons/md"

import SvgIcon from "@mui/joy/SvgIcon"
import Typography from "@mui/joy/Typography"

import type { FC } from "react"

export const Duration: FC<{ duration: LuxonDuration }> = ({ duration }) => {
	return (
		<Typography
			startDecorator={<SvgIcon component={MdSchedule} />}
			noWrap
			marginLeft="auto"
		>
			{duration.toFormat("h:mm")}
		</Typography>
	)
}
