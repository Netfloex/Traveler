import SEO from "@seo-default";

import { NextSeo } from "next-seo";
import { FC } from "react";

const Planner: FC = () => (
	<>
		<NextSeo title="Planner" useAppDir {...SEO} />
		<span>Hello World</span>
	</>
);

export default Planner;
