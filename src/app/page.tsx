import SEO from "@seo-default";

import { NextSeo } from "next-seo";
import { FC } from "react";

const Page: FC = () => (
	<>
		<NextSeo title="Hello" useAppDir {...SEO} />
		<span>Hello World</span>
	</>
);

export default Page;
