import styles from "./Planner.module.scss";

import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { LocationAutocomplete } from "./components/LocationAutocomplete";

import { Card, Typography } from "@client/joy";

import SEO from "@seo-default";

const Planner: NextPage = () => (
	<>
		<NextSeo title="Planner" useAppDir {...SEO} />
		<Card variant="outlined" className={styles.wrapper}>
			<Typography level="h3">Plan your trip</Typography>
			<div className={styles.textFieldsWrapper}>
				<LocationAutocomplete label="From" />
				<LocationAutocomplete label="To" />
			</div>
		</Card>
	</>
);

export default Planner;
