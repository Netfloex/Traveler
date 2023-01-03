import { DateTime } from "luxon";
import { FC } from "react";
import { MdArrowForward } from "react-icons/md";

import Card from "@mui/joy/Card";
import SvgIcon from "@mui/joy/SvgIcon";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";

import { ModeTypeToIcon } from "../ModeTypeToIcon";

import { Itinerary } from "@endpoints/planner/PlannerResultSchema";

export const ItineraryPanel: FC<{ itinerary: Itinerary }> = ({ itinerary }) => {
	return (
		<TabPanel value={itinerary.id}>
			<Card variant="soft" sx={{ "--Card-padding": "1rem" }}>
				{itinerary.legs.map((leg) => (
					<div key={leg.id}>
						<Typography
							level="h2"
							fontSize="md"
							sx={{
								display: "flex",
								alignItems: "center"
							}}
						>
							{leg.from.arrival?.toLocaleString(
								DateTime.TIME_24_SIMPLE
							)}
							<SvgIcon component={MdArrowForward} />
							{leg.from.departure?.toLocaleString(
								DateTime.TIME_24_SIMPLE
							)}
						</Typography>

						<Typography
							level="body1"
							sx={{
								display: "flex",
								alignItems: "center"
							}}
						>
							<> </>
							<ModeTypeToIcon type={leg.mode} />
							<> </>

							{leg.from.name}
							<> </>
							<SvgIcon component={MdArrowForward} />
							<> </>
							{leg.to.name}
						</Typography>
					</div>
				))}
			</Card>
		</TabPanel>
	);
};
