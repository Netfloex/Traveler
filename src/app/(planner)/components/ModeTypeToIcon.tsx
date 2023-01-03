import { TravelMode } from "@endpoints/planner/PlannerResultSchema";
import SvgIcon, { SvgIconTypeMap } from "@mui/joy/SvgIcon";

import type { FC } from "react";
import { IconType } from "react-icons";
import {
	MdDirectionsBus,
	MdDirectionsWalk,
	MdSubway,
	MdTrain,
	MdTram
} from "react-icons/md";

const modeToIconMap: Record<TravelMode, IconType> = {
	WALK: MdDirectionsWalk,
	BUS: MdDirectionsBus,
	RAIL: MdTrain,
	TRAM: MdTram,
	SUBWAY: MdSubway
};

export const ModeTypeToIcon: FC<
	{
		mode: TravelMode;
	} & SvgIconTypeMap["props"]
> = ({ mode, ...props }) => {
	const icon = modeToIconMap[mode];
	if (icon) return <SvgIcon {...props} component={icon} />;
	console.log(
		mode + " is not in the list of known modes! There is no icon for it"
	);
	return <>{mode}</>;
};
