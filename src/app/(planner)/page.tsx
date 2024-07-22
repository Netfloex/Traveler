"use client"

import styles from "./Planner.module.scss"

import { NextSeo } from "next-seo"
import { FC, MouseEventHandler, useCallback, useState } from "react"
import { MdArrowForward, MdSwapHoriz, MdSwapVert } from "react-icons/md"

import IconButton from "@mui/joy/IconButton"
import SvgIcon from "@mui/joy/SvgIcon"

import { locationToString } from "@utils/locationToString"

import { LocationAutocomplete } from "./components/LocationAutocomplete"
import { TravelPlan } from "./components/TravelPlan"

import { Card, Typography } from "@client/joy"

import { LocationUnion } from "@endpoints/breng/search/SearchResultSchema"

import SEO from "@seo-default"

const SwapButton: FC<{
	disabled: boolean
	horizontal?: boolean
	onClick: MouseEventHandler
}> = ({ disabled, horizontal, onClick }) => (
	<IconButton
		onClick={onClick}
		variant="outlined"
		className={`${styles.swapButton} ${
			horizontal ? styles.swapButtonHoriz : styles.swapButtonVert
		}`}
		disabled={disabled}
	>
		<SvgIcon component={horizontal ? MdSwapHoriz : MdSwapVert} />
	</IconButton>
)

const Planner: FC = () => {
	const [departure, setDeparture] = useState<LocationUnion | false>(false)
	const [destination, setDestination] = useState<LocationUnion | false>(false)

	const swap = useCallback(() => {
		setDeparture(destination)
		setDestination(departure)
	}, [departure, destination])

	return (
		<>
			<NextSeo title="Planner" useAppDir {...SEO} />
			<div className={styles.wrapper}>
				<Card variant="outlined">
					<Typography level="h3">Plan your trip</Typography>
					<div className={styles.form}>
						<div className={styles.textFieldsWrapper}>
							<LocationAutocomplete
								label="From"
								placeholder="Departure"
								selected={departure}
								setSelected={setDeparture}
							/>
							<SwapButton
								onClick={swap}
								disabled={!(departure || destination)}
								horizontal
							/>
							<LocationAutocomplete
								label="To"
								placeholder="Destination"
								selected={destination}
								setSelected={setDestination}
							/>
						</div>
						<SwapButton
							onClick={swap}
							disabled={!(departure || destination)}
						/>
					</div>
				</Card>

				{departure && destination && (
					<Card variant="outlined">
						<Typography level="h4">
							<Typography endDecorator={<></>}>
								{locationToString(departure)}
							</Typography>
							<Typography
								startDecorator={
									<SvgIcon component={MdArrowForward} />
								}
							>
								{locationToString(destination)}
							</Typography>
						</Typography>
						<TravelPlan
							departure={departure}
							destination={destination}
						/>
					</Card>
				)}
			</div>
		</>
	)
}

export default Planner
