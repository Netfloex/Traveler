import styles from "./TravelPlan.module.scss"

import uniqBy from "lodash.uniqby"
import { DateTime } from "luxon"
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react"
import { MdWarning } from "react-icons/md"
import { preload } from "swr"
import useSWRInfinite from "swr/infinite"

import Alert from "@mui/joy/Alert"
import CircularProgress from "@mui/joy/CircularProgress"
import ListDivider from "@mui/joy/ListDivider"
import ListItemButton from "@mui/joy/ListItemButton"
import SvgIcon from "@mui/joy/SvgIcon"
import TabList from "@mui/joy/TabList"
import Tabs from "@mui/joy/Tabs"
import Typography from "@mui/joy/Typography"

import { ItineraryPanel } from "./ItineraryPanel"
import { ItineraryTab } from "./ItineraryTab"

import { PlannerOptions, planner } from "@endpoints/ns/planner"
import {
	Itinerary,
	ItineraryLeg,
	PlannerResult,
} from "@endpoints/ns/planner/PlannerSchema"

const UnmemoizedTravelPlan: FC<{
	departure: LocationUnion
	destination: LocationUnion
}> = ({ departure, destination }) => {
	const [date] = useState(DateTime.now())

	const getPlannerOptions = useCallback<(ctx?: string) => PlannerOptions>(
		(ctx) => ({
			date,
			departure,
			destination,
		}),
		[date, departure, destination],
	)

	const { data, error, isLoading, setSize, size } = useSWRInfinite(
		(_, data: PlannerResult | undefined): PlannerOptions =>
			getPlannerOptions(),
		// data ? data.metadata.nextDateTime :
		planner,
		{
			revalidateAll: false,
			revalidateFirstPage: false,
		},
	)

	const isLoadingInitialData = !data && !error
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined")

	useEffect(() => {
		const lastData = data?.at(-1)
		if (!lastData) return

		preload(
			getPlannerOptions(),
			// lastData.metadata.nextDateTime
			planner,
		)
	}, [data, getPlannerOptions])

	useEffect(() => {
		if (error) console.error(error)
	}, [error])

	const itineraries: Itinerary[] | undefined = useMemo(() => {
		if (data)
			return uniqBy(
				data.flatMap((e) => e.trips),
				"id",
			)
	}, [data])

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<CircularProgress />
			</div>
		)
	} else if (error) {
		return (
			<>
				<Alert
					color="danger"
					startDecorator={<SvgIcon component={MdWarning} />}
				>
					Error fetching travel advice:
				</Alert>
				<Typography>{String(error)}</Typography>
				{"stack" in error && <pre>{error.stack}</pre>}
			</>
		)
	}

	if (!itineraries) {
		return <>No data?</>
	}
	if (!itineraries.length) {
		return <>No itineraries</>
	}

	return (
		<Tabs orientation="vertical" defaultValue={0} className={styles.tabs}>
			<TabList className={styles.tabList}>
				{itineraries
					.flatMap((itinerary, i) => [
						<ItineraryTab
							key={itinerary.id}
							itinerary={itinerary}
							i={i}
						/>,
						<ListDivider key={itinerary.id + "hr"} />,
					])
					.slice(0, -1)}
				<ListDivider />
				<ListItemButton
					onClick={(): void => void setSize((size) => size + 1)}
					disabled={isLoadingMore}
				>
					Later...
					<Typography level="body2" marginLeft="auto" display="flex">
						{isLoadingMore && <CircularProgress size="sm" />}
					</Typography>
				</ListItemButton>
			</TabList>
			{itineraries.map((itinerary, i) => (
				<ItineraryPanel
					key={itinerary.id}
					itinerary={itinerary}
					i={i}
				/>
			))}
		</Tabs>
	)
}

export const TravelPlan = memo(UnmemoizedTravelPlan)
