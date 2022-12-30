import styles from "./Planner.module.scss";

import { NextSeo } from "next-seo";
import { FC } from "react";

import { Card, Typography } from "@client/joy";

import SEO from "@seo-default";

const Planner: FC = () => {
	return (
		<>
			<NextSeo title="Planner" useAppDir {...SEO} />
			<Card variant="outlined" className={styles.wrapper}>
				<Typography level="h3">Plan your trip</Typography>
			</Card>
		</>
	);
};

export default Planner;
