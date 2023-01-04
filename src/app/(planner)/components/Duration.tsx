import SvgIcon from "@mui/joy/SvgIcon";
import Typography from "@mui/joy/Typography";
import { Duration as LuxonDuration } from "luxon";
import type { FC } from "react";
import { MdSchedule } from "react-icons/md";

export const Duration: FC<{ duration: LuxonDuration }> = ({ duration }) => {
	return (
		<Typography
			startDecorator={<SvgIcon component={MdSchedule} />}
			noWrap
			marginLeft="auto"
		>
			{duration.toFormat("h:mm")}
		</Typography>
	);
};
