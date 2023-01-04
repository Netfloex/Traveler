import ky from "ky"

export const brengApi = ky.extend({
	prefixUrl: "https://www.breng.nl/api",
	cache: "force-cache",
})
