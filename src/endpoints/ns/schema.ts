const e: MySchema = [
	{
		trips: [
			{
				legs: [{}],
			},
		],
	},
]
export type MySchema = {
	/**
	 * Source system that has generated these travel advices
	 */
	source: "HARP" | "NEGENTWEE" | "GOOGLE" | "PAS"
	/**
	 * List of trips
	 */
	trips: {
		/**
		 * Unique identifier for this trip
		 */
		uid: string
		/**
		 * Reconstruction context for this trip. Can be used to reconstruct this exact trip with the v3/trips/trip endpoint
		 */
		ctxRecon: string
		/**
		 * Planned duration of this trip in minutes
		 */
		plannedDurationInMinutes?: number
		/**
		 * Actual duration of this trip in minutes, or the planned duration if no realtime information about this trip is available.
		 */
		actualDurationInMinutes?: number
		/**
		 * Number of public transit transfers
		 */
		transfers: number
		/**
		 * Status of this trip
		 */
		status:
			| "CANCELLED"
			| "CHANGE_NOT_POSSIBLE"
			| "CHANGE_COULD_BE_POSSIBLE"
			| "ALTERNATIVE_TRANSPORT"
			| "DISRUPTION"
			| "MAINTENANCE"
			| "UNCERTAIN"
			| "REPLACEMENT"
			| "ADDITIONAL"
			| "SPECIAL"
			| "NORMAL"
		/**
		 * List of messages regarding maintenance or disruption that influences this trip.
		 */
		messages?: {
			id?: string
			externalId?: string
			head?: string
			text?: string
			lead?: string
			routeIdxFrom?: number
			routeIdxTo?: number
			type?: "MAINTENANCE" | "DISRUPTION"
			startDate?: string
			endDate?: string
			startTime?: string
			endTime?: string
			[k: string]: unknown
		}[]
		legs: {
			idx?: string
			name?: string
			travelType?:
				| "PUBLIC_TRANSIT"
				| "WALK"
				| "TRANSFER"
				| "BIKE"
				| "CAR"
				| "KISS"
				| "TAXI"
				| "UNKNOWN"
			direction?: string
			cancelled: boolean
			changePossible: boolean
			alternativeTransport: boolean
			journeyDetailRef?: string
			origin: {
				name?: string
				lng?: number
				lat?: number
				city?: string
				countryCode?: string
				uicCode?: string
				type?: "STATION" | "ADDRESS" | "POINT_OF_INTEREST"
				prognosisType?: string
				plannedTimeZoneOffset?: number
				plannedDateTime?: string
				actualTimeZoneOffset?: number
				actualDateTime?: string
				plannedTrack?: string
				actualTrack?: string
				exitSide?: "LEFT" | "RIGHT" | "UNKNOWN"
				checkinStatus?:
					| "CHECKIN"
					| "CHECKOUT"
					| "OVERCHECK"
					| "DETOUR"
					| "REQUIRED_CHECK_OUT_IN"
					| "NOTHING"
				travelAssistanceBookingInfo?: {
					name: string
					tripLegIndex: string
					stationUic?: string
					serviceTypeIds: string[]
					defaultAssistanceValue: boolean
					canChangeAssistance: boolean
					message?: string
					[k: string]: unknown
				}
				travelAssistanceMeetingPoints?: string[]
				travelAssistanceMeetingPointDetails?: {
					name: string
					minutesBefore: number
					[k: string]: unknown
				}[]
				notes?: {
					value?: string
					key?: string
					noteType?:
						| "UNKNOWN"
						| "ATTRIBUTE"
						| "INFOTEXT"
						| "REALTIME"
						| "TICKET"
						| "HINT"
					priority?: number
					routeIdxFrom?: number
					routeIdxTo?: number
					link?: {
						title?: string
						url?: string
						[k: string]: unknown
					}
					isPresentationRequired: boolean
					category?:
						| "PLATFORM_INFORMATION"
						| "OVERCHECK_INSTRUCTION"
						| "UNKNOWN"
					[k: string]: unknown
				}[]
				quayCode?: string
				[k: string]: unknown
			}
			destination: {
				name?: string
				lng?: number
				lat?: number
				city?: string
				countryCode?: string
				uicCode?: string
				type?: "STATION" | "ADDRESS" | "POINT_OF_INTEREST"
				prognosisType?: string
				plannedTimeZoneOffset?: number
				plannedDateTime?: string
				actualTimeZoneOffset?: number
				actualDateTime?: string
				plannedTrack?: string
				actualTrack?: string
				exitSide?: "LEFT" | "RIGHT" | "UNKNOWN"
				checkinStatus?:
					| "CHECKIN"
					| "CHECKOUT"
					| "OVERCHECK"
					| "DETOUR"
					| "REQUIRED_CHECK_OUT_IN"
					| "NOTHING"
				travelAssistanceBookingInfo?: {
					name: string
					tripLegIndex: string
					stationUic?: string
					serviceTypeIds: string[]
					defaultAssistanceValue: boolean
					canChangeAssistance: boolean
					message?: string
					[k: string]: unknown
				}
				travelAssistanceMeetingPoints?: string[]
				travelAssistanceMeetingPointDetails?: {
					name: string
					minutesBefore: number
					[k: string]: unknown
				}[]
				notes?: {
					value?: string
					key?: string
					noteType?:
						| "UNKNOWN"
						| "ATTRIBUTE"
						| "INFOTEXT"
						| "REALTIME"
						| "TICKET"
						| "HINT"
					priority?: number
					routeIdxFrom?: number
					routeIdxTo?: number
					link?: {
						title?: string
						url?: string
						[k: string]: unknown
					}
					isPresentationRequired: boolean
					category?:
						| "PLATFORM_INFORMATION"
						| "OVERCHECK_INSTRUCTION"
						| "UNKNOWN"
					[k: string]: unknown
				}[]
				quayCode?: string
				[k: string]: unknown
			}
			product?: {
				number?: string
				categoryCode?: string
				shortCategoryName?: string
				longCategoryName?: string
				operatorCode?: string
				operatorName?: string
				operatorAdministrativeCode?: number
				type:
					| "BIKE"
					| "BUS"
					| "CAR"
					| "FERRY"
					| "METRO"
					| "SHARED_MODALITY"
					| "SUBWAY"
					| "TAXI"
					| "TRAIN"
					| "TRAM"
					| "UNKNOWN"
					| "WALK"
				displayName?: string
				[k: string]: unknown
			}
			sharedModality?: {
				provider: string
				name?: string
				availability: boolean
				nearByMeMapping:
					| "OV_FIETS"
					| "SHARED_ELECTRICAL_BIKE"
					| "SHARED_BIKE"
					| "SHARED_SCOOTER"
					| "SHARED_CAR"
					| "UNKNOWN"
				planIcon?: string
				[k: string]: unknown
			}
			notes?: {
				value?: string
				key?: string
				noteType?:
					| "UNKNOWN"
					| "ATTRIBUTE"
					| "INFOTEXT"
					| "REALTIME"
					| "TICKET"
					| "HINT"
				priority?: number
				routeIdxFrom?: number
				routeIdxTo?: number
				link?: {
					title?: string
					url?: string
					[k: string]: unknown
				}
				isPresentationRequired: boolean
				category?:
					| "PLATFORM_INFORMATION"
					| "OVERCHECK_INSTRUCTION"
					| "UNKNOWN"
				[k: string]: unknown
			}[]
			messages?: {
				id?: string
				externalId?: string
				head?: string
				text?: string
				lead?: string
				routeIdxFrom?: number
				routeIdxTo?: number
				type?: "MAINTENANCE" | "DISRUPTION"
				startDate?: string
				endDate?: string
				startTime?: string
				endTime?: string
				[k: string]: unknown
			}[]
			stops: {
				uicCode?: string
				name?: string
				lat?: number
				lng?: number
				countryCode?: string
				notes: {
					value: string
					key?: string
					type: "U" | "A" | "I" | "R" | "H"
					priority?: number
					[k: string]: unknown
				}[]
				routeIdx?: number
				departurePrognosisType?: string
				plannedDepartureDateTime?: string
				plannedDepartureTimeZoneOffset?: number
				actualDepartureDateTime?: string
				actualDepartureTimeZoneOffset?: number
				plannedArrivalDateTime?: string
				plannedArrivalTimeZoneOffset?: number
				actualArrivalDateTime?: string
				actualArrivalTimeZoneOffset?: number
				plannedPassingDateTime?: string
				actualPassingDateTime?: string
				arrivalPrognosisType?: string
				actualDepartureTrack?: string
				plannedDepartureTrack?: string
				plannedArrivalTrack?: string
				actualArrivalTrack?: string
				departureDelayInSeconds?: number
				arrivalDelayInSeconds?: number
				cancelled: boolean
				borderStop: boolean
				passing: boolean
				quayCode?: string
				[k: string]: unknown
			}[]
			steps?: {
				distanceInMeters: number
				durationInSeconds: number
				/**
				 * Gives more information about the location of the alternative transport
				 */
				startLocation: {
					/**
					 * Gives information about the station the alternative transport belongs to
					 */
					station: {
						uicCode: string
						stationCode?: string
						name: string
						coordinate?: {
							lat: number
							lng: number
							[k: string]: unknown
						}
						countryCode: string
						[k: string]: unknown
					}
					/**
					 * Human readable description of the location of the alternative transport
					 */
					description: string
					[k: string]: unknown
				}
				/**
				 * Gives more information about the location of the alternative transport
				 */
				endLocation: {
					/**
					 * Gives information about the station the alternative transport belongs to
					 */
					station: {
						uicCode: string
						stationCode?: string
						name: string
						coordinate?: {
							lat: number
							lng: number
							[k: string]: unknown
						}
						countryCode: string
						[k: string]: unknown
					}
					/**
					 * Human readable description of the location of the alternative transport
					 */
					description: string
					[k: string]: unknown
				}
				instructions: string
				[k: string]: unknown
			}[]
			coordinates?: number[][]
			crowdForecast?: "UNKNOWN" | "LOW" | "MEDIUM" | "HIGH"
			punctuality?: number
			crossPlatformTransfer?: boolean
			shorterStock?: boolean
			changeCouldBePossible?: boolean
			shorterStockWarning?: string
			shorterStockClassification?: "BUSY" | "EXTRA_BUSY"
			journeyDetail?: {
				type: "BTM" | "TRAIN_XML" | "TRAIN_JSON"
				link: {
					title?: string
					url?: string
					[k: string]: unknown
				}
				[k: string]: unknown
			}[]
			reachable: boolean
			plannedDurationInMinutes?: number
			travelAssistanceDeparture?: {
				name: string
				tripLegIndex: string
				stationUic?: string
				serviceTypeIds: string[]
				defaultAssistanceValue: boolean
				canChangeAssistance: boolean
				message?: string
				[k: string]: unknown
			}
			travelAssistanceArrival?: {
				name: string
				tripLegIndex: string
				stationUic?: string
				serviceTypeIds: string[]
				defaultAssistanceValue: boolean
				canChangeAssistance: boolean
				message?: string
				[k: string]: unknown
			}
			overviewPolyLine?: {
				lat: number
				lng: number
				[k: string]: unknown
			}[]
			[k: string]: unknown
		}[]
		overviewPolyLine?: {
			lat: number
			lng: number
			[k: string]: unknown
		}[]
		crowdForecast?: "UNKNOWN" | "LOW" | "MEDIUM" | "HIGH"
		punctuality?: number
		/**
		 * Whether or not this trip is regarded the best possible option of all returned trips
		 */
		optimal: boolean
		fareRoute?: {
			routeId?: string
			origin: {
				varCode: number
				name?: string
				[k: string]: unknown
			}
			destination: {
				varCode: number
				name?: string
				[k: string]: unknown
			}
			[k: string]: unknown
		}
		fares?: {
			priceInCents?: number
			product?:
				| "OVCHIPKAART_ENKELE_REIS"
				| "OVCHIPKAART_RETOUR"
				| "TRAJECT_VRIJ_MAAND"
				| "TRAJECT_VRIJ_JAAR"
				| "BUSINESS_CARD_TRAJECT_VRIJ_JAAR"
				| "ETICKET_ENKELE_REIS"
				| "ETICKET_RETOUR"
				| "ETICKET_JOINT_JOURNEY_DISCOUNT_RETOUR"
				| "ETICKET_JOINT_JOURNEY_DISCOUNT_ENKELE_REIS"
				| "EARLY_BOOKING_DISCOUNT_ENKELE_REIS"
				| "EARLY_BOOKING_DISCOUNT_RETOUR"
				| "GROUP_OFF_PEAK"
				| "NS_DEAL_DISCOUNT_ENKELE_REIS"
				| "RAILRUNNER"
				| "ICE_SUPPLEMENT"
				| "ICD_SUPPLEMENT"
				| "NSI"
			travelClass?: "FIRST_CLASS" | "SECOND_CLASS"
			priceInCentsExcludingSupplement?: number
			discountType?:
				| "NO_DISCOUNT"
				| "DISCOUNT_20_PERCENT"
				| "DISCOUNT_40_PERCENT"
				| "NO_CHARGE"
				| "OTHER"
			supplementInCents?: number
			link?: string
			[k: string]: unknown
		}[]
		fareLegs?: {
			origin: {
				name?: string
				lng?: number
				lat?: number
				city?: string
				countryCode?: string
				uicCode?: string
				type?: "STATION" | "ADDRESS" | "POINT_OF_INTEREST"
				prognosisType?: string
				plannedTimeZoneOffset?: number
				plannedDateTime?: string
				actualTimeZoneOffset?: number
				actualDateTime?: string
				plannedTrack?: string
				actualTrack?: string
				exitSide?: "LEFT" | "RIGHT" | "UNKNOWN"
				checkinStatus?:
					| "CHECKIN"
					| "CHECKOUT"
					| "OVERCHECK"
					| "DETOUR"
					| "REQUIRED_CHECK_OUT_IN"
					| "NOTHING"
				travelAssistanceBookingInfo?: {
					name: string
					tripLegIndex: string
					stationUic?: string
					serviceTypeIds: string[]
					defaultAssistanceValue: boolean
					canChangeAssistance: boolean
					message?: string
					[k: string]: unknown
				}
				travelAssistanceMeetingPoints?: string[]
				travelAssistanceMeetingPointDetails?: {
					name: string
					minutesBefore: number
					[k: string]: unknown
				}[]
				notes?: {
					value?: string
					key?: string
					noteType?:
						| "UNKNOWN"
						| "ATTRIBUTE"
						| "INFOTEXT"
						| "REALTIME"
						| "TICKET"
						| "HINT"
					priority?: number
					routeIdxFrom?: number
					routeIdxTo?: number
					link?: {
						title?: string
						url?: string
						[k: string]: unknown
					}
					isPresentationRequired: boolean
					category?:
						| "PLATFORM_INFORMATION"
						| "OVERCHECK_INSTRUCTION"
						| "UNKNOWN"
					[k: string]: unknown
				}[]
				quayCode?: string
				[k: string]: unknown
			}
			destination: {
				name?: string
				lng?: number
				lat?: number
				city?: string
				countryCode?: string
				uicCode?: string
				type?: "STATION" | "ADDRESS" | "POINT_OF_INTEREST"
				prognosisType?: string
				plannedTimeZoneOffset?: number
				plannedDateTime?: string
				actualTimeZoneOffset?: number
				actualDateTime?: string
				plannedTrack?: string
				actualTrack?: string
				exitSide?: "LEFT" | "RIGHT" | "UNKNOWN"
				checkinStatus?:
					| "CHECKIN"
					| "CHECKOUT"
					| "OVERCHECK"
					| "DETOUR"
					| "REQUIRED_CHECK_OUT_IN"
					| "NOTHING"
				travelAssistanceBookingInfo?: {
					name: string
					tripLegIndex: string
					stationUic?: string
					serviceTypeIds: string[]
					defaultAssistanceValue: boolean
					canChangeAssistance: boolean
					message?: string
					[k: string]: unknown
				}
				travelAssistanceMeetingPoints?: string[]
				travelAssistanceMeetingPointDetails?: {
					name: string
					minutesBefore: number
					[k: string]: unknown
				}[]
				notes?: {
					value?: string
					key?: string
					noteType?:
						| "UNKNOWN"
						| "ATTRIBUTE"
						| "INFOTEXT"
						| "REALTIME"
						| "TICKET"
						| "HINT"
					priority?: number
					routeIdxFrom?: number
					routeIdxTo?: number
					link?: {
						title?: string
						url?: string
						[k: string]: unknown
					}
					isPresentationRequired: boolean
					category?:
						| "PLATFORM_INFORMATION"
						| "OVERCHECK_INSTRUCTION"
						| "UNKNOWN"
					[k: string]: unknown
				}[]
				quayCode?: string
				[k: string]: unknown
			}
			operator?: string
			productTypes: (
				| "TRAIN"
				| "BUS"
				| "TRAM"
				| "METRO"
				| "FERRY"
				| "WALK"
				| "BIKE"
				| "CAR"
				| "TAXI"
				| "SUBWAY"
				| "SHARED_MODALITY"
				| "UNKNOWN"
			)[]
			fares: {
				priceInCents?: number
				priceInCentsExcludingSupplement?: number
				supplementInCents?: number
				buyableTicketPriceInCents?: number
				buyableTicketPriceInCentsExcludingSupplement?: number
				buyableTicketSupplementPriceInCents?: number
				product?:
					| "GEEN"
					| "OVCHIPKAART_ENKELE_REIS"
					| "OVCHIPKAART_RETOUR"
					| "DAL_VOORDEEL"
					| "ALTIJD_VOORDEEL"
					| "DAL_VRIJ"
					| "WEEKEND_VRIJ"
					| "ALTIJD_VRIJ"
					| "BUSINESSCARD"
					| "BUSINESSCARD_DAL"
					| "STUDENT_WEEK"
					| "STUDENT_WEEKEND"
					| "VDU"
					| "SAMENREISKORTING"
					| "TRAJECT_VRIJ"
				travelClass?: "FIRST_CLASS" | "SECOND_CLASS"
				discountType:
					| "NO_DISCOUNT"
					| "DISCOUNT_20_PERCENT"
					| "DISCOUNT_40_PERCENT"
					| "NO_CHARGE"
					| "OTHER"
				link?: string
				[k: string]: unknown
			}[]
			[k: string]: unknown
		}[]
		productFare?: {
			priceInCents?: number
			priceInCentsExcludingSupplement?: number
			supplementInCents?: number
			buyableTicketPriceInCents?: number
			buyableTicketPriceInCentsExcludingSupplement?: number
			buyableTicketSupplementPriceInCents?: number
			product?:
				| "GEEN"
				| "OVCHIPKAART_ENKELE_REIS"
				| "OVCHIPKAART_RETOUR"
				| "DAL_VOORDEEL"
				| "ALTIJD_VOORDEEL"
				| "DAL_VRIJ"
				| "WEEKEND_VRIJ"
				| "ALTIJD_VRIJ"
				| "BUSINESSCARD"
				| "BUSINESSCARD_DAL"
				| "STUDENT_WEEK"
				| "STUDENT_WEEKEND"
				| "VDU"
				| "SAMENREISKORTING"
				| "TRAJECT_VRIJ"
			travelClass?: "FIRST_CLASS" | "SECOND_CLASS"
			discountType:
				| "NO_DISCOUNT"
				| "DISCOUNT_20_PERCENT"
				| "DISCOUNT_40_PERCENT"
				| "NO_CHARGE"
				| "OTHER"
			link?: string
			[k: string]: unknown
		}
		fareOptions?: {
			isInternationalBookable: boolean
			isInternational: boolean
			isEticketBuyable: boolean
			isPossibleWithOvChipkaart: boolean
			isTotalPriceUnknown: boolean
			supplementsBasedOnSelectedFare?: {
				supplementPriceInCents: number
				legIdx?: string
				fromUICCode?: string
				toUICCode?: string
				link?: {
					title?: string
					url?: string
					[k: string]: unknown
				}
				[k: string]: unknown
			}[]
			reasonEticketNotBuyable?: {
				reason:
					| "UNKNOWN_PRICE"
					| "TOO_MANY_SEPARATE_PARTS"
					| "TOO_FAR_IN_PAST"
					| "TOO_FAR_IN_FUTURE"
					| "STATION_NOT_OPEN_YET"
					| "TRIP_IS_NOT_DOMESTIC"
					| "VIA_STATION_REQUESTED"
					| "NO_TRAIN_LEGS_IN_TRIP"
				description?: string
				[k: string]: unknown
			}
			salesOptions?: {
				type: "EARLY_BOOKING_DISCOUNT" | "NS_DEAL_DISCOUNT"
				permilleFullTariff?: number
				priceInCents?: number
				betterOption: boolean
				recommendationText?: string
				[k: string]: unknown
			}[]
			[k: string]: unknown
		}
		bookingUrl?: {
			title?: string
			url?: string
			[k: string]: unknown
		}
		type: "NS" | "NS_ACCESSIBLE" | "NEGENTWEE" | "GOOGLE" | "PAS"
		shareUrl?: {
			title?: string
			url?: string
			[k: string]: unknown
		}
		realtime: boolean
		travelAssistanceInfo?: {
			termsAndConditionsLink?: string
			tripRequestId: number
			isAssistanceRequired: boolean
			[k: string]: unknown
		}
		routeId?: string
		registerJourney?: {
			url?: string
			searchUrl: string
			status:
				| "REGISTRATION_POSSIBLE"
				| "NOT_AVAILABLE"
				| "DATE_IN_PAST"
				| "DATE_TOO_FAR_FUTURE"
				| "NOT_NECESSARY_OTHER_OPERATOR"
				| "UNKNOWN"
			bicycleReservationRequired: boolean
			availability?: {
				seats: boolean
				numberOfSeats?: number
				bicycle: boolean
				numberOfBicyclePlaces?: number
				[k: string]: unknown
			}
			[k: string]: unknown
		}
		eco?: {
			co2kg: number
			[k: string]: unknown
		}
		[k: string]: unknown
	}[]
	/**
	 * Scroll context to use when scrolling back in time. Can be used in scrollContext query parameter
	 */
	scrollRequestBackwardContext?: string
	/**
	 * Scroll context to use when scrolling forward in time. Can be used in scrollContext query parameter
	 */
	scrollRequestForwardContext?: string
	/**
	 * Optional message indicating why the list of trips is empty.
	 */
	message?: string
	[k: string]: unknown
}[]
