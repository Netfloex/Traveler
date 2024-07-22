"use client"

import { SWRConfig } from "swr"

import { FCC } from "@typings/FCC"

export const SWRGlobalConfig: FCC = ({ children }) => {
	return (
		<SWRConfig
			value={{
				revalidateIfStale: false,
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				errorRetryCount: 0,
			}}
		>
			{children}
		</SWRConfig>
	)
}
