import styles from "./Duration.module.scss";

import type { FC } from "react";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import { MdSchedule } from "react-icons/md";
import { Duration as LuxonDuration } from "luxon";

export const Duration: FC<{ duration: LuxonDuration }> = ({ duration }) => {
	return (
		<Typography
			className={styles.duration}
			startDecorator={<SvgIcon component={MdSchedule} />}
			noWrap
		>
			{duration.toFormat("h:mm")}
		</Typography>
	);
};
