import { useEffect, useState } from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/system';
import axios from 'axios';

const Label = styled('label')({
	display: 'block',
});

const Input = styled('input')(({ theme }) => ({
	width: 148,
	height: 25,
	borderRadius: 5,
	border: 'none',
	outlineColor: 'red',
	backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
	color: theme.palette.mode === 'light' ? '#000' : '#fff',
}));

const Listbox = styled('ul')(({ theme }) => ({
	width: 170,
	translate: -10,
	margin: 0,
	padding: 0,
	zIndex: 200,
	position: 'absolute',
	listStyle: 'none',
	color: '#000',
	borderRadius: 3,
	backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
	overflow: 'auto',
	maxHeight: 200,
	fontSize: 14,
	border: '1px solid rgba(0,0,0,.25)',
	'& li.Mui-focused': {
		backgroundColor: 'red',
		color: 'white',
		cursor: 'pointer',
	},
	'& li:active': {
		backgroundColor: '#2977f5',
		color: 'white',
	},
}));
const AutoComplete = ({ property, setNameSearch, setIsloading }) => {
	const [data, setData] = useState([]);

	const { getRootProps, getInputLabelProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
		id: 'use-autocomplete-demo',
		options: data,
		getOptionLabel: (option) => option[property],
		isOptionEqualToValue: (option, value) => option[property] !== 'strange behavior',
	});

	const search = getInputProps().value;

	useEffect(() => {
		const fetchData = async () => {
			try {
				let url;
				let params;
				if (property === 'name') {
					// url = 'http://localhost:4000/characters';
					url = 'https://site--marvel--gsmxcbzt8tzm.code.run/characters';
					params = { params: { name: search } };
				} else {
					// url = `http://localhost:4000/comics`;
					url = `https://site--marvel--gsmxcbzt8tzm.code.run/comics`;
					params = { params: { title: search } };
				}
				const response = await axios.get(url, params);

				setData(response.data.results);
			} catch (error) {}
		};
		fetchData();
	}, [search, property]);
	return (
		<div>
			<div {...getRootProps()}>
				<Label {...getInputLabelProps()}></Label>
				<Input
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							if (getInputProps().value) {
								setIsloading(true);
								setNameSearch('');
							}
							setIsloading(true);
							setNameSearch(getInputProps().value.replace(/ *\([^)]*\) */g, ''));
						}
					}}
					{...getInputProps()}
					placeholder={property === 'name' ? 'Search your character' : 'Search your Comics'}
				/>
			</div>
			{groupedOptions.length > 0 ? (
				<Listbox {...getListboxProps()}>
					{groupedOptions.map((option, index) => (
						<li
							{...getOptionProps({ option, index })}
							key={option._id}
						>
							{option[property].replace(/ *\([^)]*\) */g, '')}
						</li>
					))}
				</Listbox>
			) : null}
		</div>
	);
};

export default AutoComplete;
