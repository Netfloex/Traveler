"use client";

import styles from "./Planner.module.scss";

import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";

import SvgIcon from "@mui/joy/SvgIcon";

import { locationToString } from "@utils/locationToString";

import { LocationAutocomplete } from "./components/LocationAutocomplete";
import { TravelPlan } from "./components/TravelPlan";

import { Card, Typography } from "@client/joy";

import { LocationUnion } from "@endpoints/search/SearchResultSchema";

import SEO from "@seo-default";

const Planner: NextPage = () => {
	const [departure, setDeparture] = useState<LocationUnion | false>(false);
	const [destination, setDestination] = useState<LocationUnion | false>(
		false
	);

	return (
		<>
			<NextSeo title="Planner" useAppDir {...SEO} />
			<div className={styles.wrapper}>
				<Card variant="outlined">
					<Typography level="h3">Plan your trip</Typography>
					<div className={styles.textFieldsWrapper}>
						<LocationAutocomplete
							label="From"
							placeholder="Departure"
							selected={departure}
							setSelected={setDeparture}
						/>
						<LocationAutocomplete
							label="To"
							placeholder="Destination"
							selected={destination}
							setSelected={setDestination}
						/>
					</div>
				</Card>

				{departure && destination && (
					<Card variant="outlined">
						<Typography>
							<Typography level="h4" endDecorator={<></>}>
								{locationToString(departure)}
							</Typography>
							<Typography
								level="h4"
								startDecorator={
									<SvgIcon component={MdArrowForward} />
								}
							>
								{locationToString(destination)}
							</Typography>
						</Typography>
						<TravelPlan
							departure={departure}
							destination={destination}
						/>
					</Card>
				)}
			</div>
		</>
	);
};

export default Planner;
