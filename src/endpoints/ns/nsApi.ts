import { http } from "@endpoints/http"

const apiKey = process.env.NEXT_PUBLIC_NS_API_KEY

export const nsApi = http.extend({
	prefixUrl: "https://gateway.apiportal.ns.nl",
	headers: {
		"Ocp-Apim-Subscription-Key": apiKey,
	},
	hooks: {
		beforeRequest: [
			(): void => {
				if (!apiKey) {
					throw new Error("Missing NS_API_KEY!")
				}
			},
		],
	},
})
