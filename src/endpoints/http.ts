import ky, { HTTPError } from "ky"

export const http = ky.create({
	cache: "force-cache",
	hooks: {
		beforeError: [
			(error): HTTPError => {
				console.log(error.response.body)
				return error
			},
		],
	},
})
