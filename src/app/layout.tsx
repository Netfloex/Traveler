import "@styles/global.scss";

import { FCC } from "@typings/FCC";

import { InitColorSchemeScript } from "@client/InitColorSchemeScript";
import { CssBaseline, CssVarsProvider } from "@client/joy";

const RootLayout: FCC = ({ children }) => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1, width=device-width"
			/>
		</head>
		<body>
			<CssVarsProvider defaultMode="system">
				<InitColorSchemeScript />
				<CssBaseline />
				{children}
			</CssVarsProvider>
		</body>
	</html>
);

export default RootLayout;
