import { http } from "@endpoints/http"

export const brengApi = http.extend({
	prefixUrl: "https://www.breng.nl/api",
})
