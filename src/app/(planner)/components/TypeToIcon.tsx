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
	amenity: MdRestaurant,
	building: MdBusiness,
	busStation: MdDirectionsBus,
	combiTramBus: MdTram,
	ferryPort: MdDirectionsBoat,
	highway: MdTimeToLeave,
	historic: MdHistory,
	landuse: MdLandscape,
	leisure: MdWeekend,
	man_made: MdEmojiPeople,
	metroStation: MdSubway,
	natural: MdPark,
	office: MdWork,
	onstreetBus: MdDirectionsBus,
	onstreetTram: MdTram,
	other: MdPlace,
	place: MdPlace,
	railStation: MdTrain,
	railway: MdTrain,
	shop: MdStore,
	tourism: MdBeachAccess,
	tramStation: MdTram
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
