import type { FC } from "react";
import { IconType } from "react-icons";
import {
	MdTrain,
	MdDirectionsBus,
	MdSubway,
	MdStore,
	MdTimeToLeave,
	MdPlace,
	MdRestaurant,
	MdPark,
	MdDirectionsBoat,
	MdLandscape,
	MdBusiness,
	MdTram,
	MdWeekend,
	MdWork,
	MdBeachAccess,
	MdEmojiPeople,
	MdHistory
} from "react-icons/md";

import SvgIcon from "@mui/joy/SvgIcon";

import {
	GeneralLocationType,
	TransitLocationType
} from "@endpoints/search/SearchResultSchema";

const typeToIconMap: Record<
	GeneralLocationType | TransitLocationType,
	IconType
> = {
	busStation: MdDirectionsBus,
	onstreetBus: MdDirectionsBus,

	railStation: MdTrain,

	metroStation: MdSubway,

	tramStation: MdTram,
	onstreetTram: MdTram,

	shop: MdStore,
	highway: MdTimeToLeave,
	place: MdPlace,
	amenity: MdRestaurant,
	natural: MdPark,
	ferryPort: MdDirectionsBoat,
	landuse: MdLandscape,
	building: MdBusiness,
	leisure: MdWeekend,
	office: MdWork,
	tourism: MdBeachAccess,
	man_made: MdEmojiPeople,
	combiTramBus: MdTram,
	historic: MdHistory,
	other: MdPlace
};

export const TypeToIcon: FC<{
	type: GeneralLocationType | TransitLocationType;
}> = ({ type }) => {
	const icon = typeToIconMap[type];
	if (icon) return <SvgIcon component={icon} />;
	console.log(
		type + " is not in the list of known types! There is no icon for it"
	);
	return <>{type}</>;
};
