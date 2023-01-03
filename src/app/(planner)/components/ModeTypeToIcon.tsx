import { TravelMode } from "@endpoints/planner/PlannerResultSchema";
import SvgIcon from "@mui/joy/SvgIcon";

import type { FC } from "react";
import { IconType } from "react-icons";
import {
	MdDirectionsBus,
	MdDirectionsWalk,
	MdSubway,
	MdTrain,
	MdTram
} from "react-icons/md";

const typeToIconMap: Record<TravelMode, IconType> = {
	WALK: MdDirectionsWalk,
	BUS: MdDirectionsBus,
	RAIL: MdTrain,
	TRAM: MdTram,
	SUBWAY: MdSubway
};

export const ModeTypeToIcon: FC<{
	type: TravelMode;
}> = ({ type }) => {
	const icon = typeToIconMap[type];
	if (icon) return <SvgIcon component={icon} />;
	console.log(
		type + " is not in the list of known types! There is no icon for it"
	);
	return <>{type}</>;
};
