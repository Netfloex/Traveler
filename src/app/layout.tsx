import "@styles/global.scss";

import { InitColorSchemeScript } from "@client/InitColorSchemeScript";
import { CssBaseline, CssVarsProvider } from "@client/joy";

import { FCC } from "@typings/FCC";

const RootLayout: FCC = ({ children }) => {
	return (
		<html lang="en" data-joy-color-scheme="dark">
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
};

export default RootLayout;
