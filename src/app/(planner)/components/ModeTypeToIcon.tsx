import { IconType } from "react-icons"
import {
	MdCommute,
	MdDirectionsBike,
	MdDirectionsBoat,
	MdDirectionsBus,
	MdDirectionsCar,
	MdDirectionsWalk,
	MdHelp,
	MdLocalTaxi,
	MdSubway,
	MdTrain,
	MdTram,
} from "react-icons/md"

import SvgIcon, { SvgIconTypeMap } from "@mui/joy/SvgIcon"

import { TravelMode } from "@endpoints/breng/planner/PlannerResultSchema"
import { ProductType } from "@endpoints/ns/planner/PlannerSchema"

import type { FC } from "react"

const modeToIconMap: Record<ProductType | TravelMode, IconType> = {
	BIKE: MdDirectionsBike,
	BUS: MdDirectionsBus,
	CAR: MdDirectionsCar,
	FERRY: MdDirectionsBoat,
	METRO: MdSubway,
	RAIL: MdTrain,
	SHARED_MODALITY: MdCommute,
	SUBWAY: MdSubway,
	TAXI: MdLocalTaxi,
	TRAIN: MdTrain,
	TRAM: MdTram,
	UNKNOWN: MdHelp,
	WALK: MdDirectionsWalk,
}

export const ModeTypeToIcon: FC<
	{
		mode: ProductType
	} & SvgIconTypeMap["props"]
> = ({ mode, ...props }) => {
	const icon = modeToIconMap[mode]
	if (icon) return <SvgIcon {...props} component={icon} />
	console.log(
		mode + " is not in the list of known modes! There is no icon for it",
	)
	return <>{mode}</>
}
