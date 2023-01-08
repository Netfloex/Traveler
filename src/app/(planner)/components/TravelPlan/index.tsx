import styles from "./TravelPlan.module.scss"

import { DateTime } from "luxon"
import { FC, memo, useEffect, useState } from "react"
import { MdWarning } from "react-icons/md"
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

import { PlannerOptions, planner } from "@endpoints/planner"
import { PlannerResult } from "@endpoints/planner/PlannerResultSchema"
import { LocationUnion } from "@endpoints/search/SearchResultSchema"

const UnmemoizedTravelPlan: FC<{
	departure: LocationUnion
	destination: LocationUnion
}> = ({ departure, destination }) => {
	const [date] = useState(DateTime.now())

	const { data, error, isLoading, setSize, size } = useSWRInfinite(
		(_, data: PlannerResult | undefined): PlannerOptions => {
			return {
				date: data ? data.metadata.nextDateTime : date,
				departure,
				destination,
			}
		},
		planner,
	)

	const isLoadingInitialData = !data && !error
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined")

	useEffect(() => {
		if (error) console.error(error)
	}, [error])

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

	const itineraries = data!.flatMap((e) => e.plan.itineraries)

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
						{isLoadingMore ? (
							<CircularProgress size="sm" />
						) : (
							data
								?.at(-1)
								?.metadata.nextDateTime.toLocaleString(
									DateTime.TIME_24_SIMPLE,
								)
						)}
					</Typography>
				</ListItemButton>
			</TabList>
			{itineraries.map((itinerary, i) => (
				<ItineraryPanel
					key={itinerary.id}
					itinerary={itinerary}
					departure={departure}
					destination={destination}
					i={i}
				/>
			))}
		</Tabs>
	)
}

export const TravelPlan = memo(UnmemoizedTravelPlan)
