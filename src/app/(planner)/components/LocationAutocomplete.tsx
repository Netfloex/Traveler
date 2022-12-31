"use client";

import {
	Dispatch,
	FC,
	Fragment,
	ReactNode,
	SetStateAction,
	SyntheticEvent,
	useCallback,
	useState
} from "react";
import { MdSearch } from "react-icons/md";
import { locationToString } from "src/utils/locationToString";

import { SvgIcon } from "@mui/joy";
import Autocomplete, {
	AutocompleteInputChangeReason,
	createFilterOptions
} from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import CircularProgress from "@mui/joy/CircularProgress";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";

import { TypeToIcon } from "./TypeToIcon";

import { search } from "@endpoints/search";
import { LocationUnion } from "@endpoints/search/SearchResultSchema";

type OnChange = (
	event: SyntheticEvent<Element, Event>,
	value: string,
	reason: AutocompleteInputChangeReason
) => void;

export const LocationAutocomplete: FC<{
	label: string;
	placeholder: string;
	selected: false | LocationUnion;
	setSelected: Dispatch<SetStateAction<false | LocationUnion>>;
}> = ({ label, placeholder, selected, setSelected }) => {
	const [locations, setLocations] = useState<LocationUnion[]>([]);
	const [loading, setLoading] = useState(false);

	const onInputChange: OnChange = useCallback((_, value) => {
		setLoading(true);
		search(value).then((data) => {
			setLocations([...(data?.transit ?? []), ...(data?.general ?? [])]);
			setLoading(false);
		});
	}, []);

	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<Autocomplete
				autoHighlight
				noOptionsText={loading ? "Loading..." : undefined}
				onInputChange={onInputChange}
				openOnFocus
				options={locations}
				placeholder={placeholder}
				variant="soft"
				onChange={(_, value): void => {
					setSelected(value ?? false);
				}}
				getOptionLabel={locationToString}
				filterOptions={createFilterOptions({
					stringify(option) {
						return JSON.stringify(option);
					}
				})}
				startDecorator={
					selected ? (
						<TypeToIcon type={selected.type} />
					) : (
						<SvgIcon component={MdSearch} />
					)
				}
				endDecorator={
					loading ? (
						<CircularProgress size="sm" variant="soft" />
					) : null
				}
				isOptionEqualToValue={(opt, value): boolean =>
					opt.id == value.id
				}
				renderOption={(props, option): ReactNode => (
					<Fragment key={option.id}>
						{delete (props as typeof props & { key?: string }).key}
						<AutocompleteOption {...props}>
							<ListItemDecorator>
								<TypeToIcon type={option.type} />
							</ListItemDecorator>
							<ListItemContent sx={{ fontSize: "sm" }}>
								{option.name}
								<Typography level="body3">
									{"city" in option
										? option.city
										: option.country}
								</Typography>
							</ListItemContent>
						</AutocompleteOption>
					</Fragment>
				)}
			/>
		</FormControl>
	);
};
