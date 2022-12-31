"use client";

import {
	CircularProgress,
	FormControl,
	FormLabel,
	ListItemContent,
	ListItemDecorator,
	Typography
} from "@mui/joy";
import Autocomplete, { AutocompleteChangeReason } from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

import { FC, Fragment, ReactNode, SyntheticEvent, useCallback } from "react";

interface Location {
	label: string;
	id: number;
}

type OnChange = (
	event: SyntheticEvent<Element, Event>,
	value: Location | null,
	reason: AutocompleteChangeReason
) => void;

const locations = [
	{
		label: "Amsterdam",
		id: 0
	},
	{
		label: "Rotterdam",
		id: 1
	}
];

export const LocationAutocomplete: FC<{ label: string }> = ({ label }) => {
	const loading = !locations.length;

	const onChange: OnChange = useCallback((_, value) => {
		console.log(value);
	}, []);

	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<Autocomplete
				autoHighlight
				autoSelect
				loading={loading}
				onChange={onChange}
				openOnFocus
				options={locations}
				placeholder="Address, station"
				variant="soft"
				endDecorator={
					loading ? (
						<CircularProgress
							size="sm"
							sx={{ bgcolor: "background.surface" }}
						/>
					) : null
				}
				isOptionEqualToValue={(opt, value): boolean =>
					opt.id == value.id
				}
				renderOption={(props, option): ReactNode => (
					<Fragment key={option.id}>
						{delete (props as typeof props & { key?: string }).key}
						<AutocompleteOption {...props}>
							<ListItemDecorator>AA</ListItemDecorator>
							<ListItemContent sx={{ fontSize: "sm" }}>
								{option.label}
								<Typography level="body3">
									{option.label}
								</Typography>
							</ListItemContent>
						</AutocompleteOption>
					</Fragment>
				)}
			/>
		</FormControl>
	);
};
