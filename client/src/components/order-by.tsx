import { useState } from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import useQueryParams from '@/hooks/use-query-params';

export const OrderBy = () => {
	const [orderBy, setOrderBy] = useState('');
	const [_, setParams] = useQueryParams();

	const onOrderBy = (value: string) => {
		let splitted = value.split('=');
		setOrderBy(splitted[1]);
		setParams({ [splitted[0]]: splitted[1] });
	};

	return (
		<Select onValueChange={onOrderBy} defaultValue={orderBy}>
			<SelectTrigger className="bg-transparent focus:ring-offset-0  focus:ring-0 border-none w-32">
				<SelectValue placeholder="Order by" />
			</SelectTrigger>
			<SelectContent className="w-fit bg-magic-500 border-magic-550">
				<SelectItem
					className="focus:bg-magic-550 cursor-pointer"
					value="or_price=asc"
				>
					Lowest price
				</SelectItem>
				<SelectItem
					className="focus:bg-magic-550 cursor-pointer"
					value="or_price=desc"
				>
					Higher price
				</SelectItem>

				{/* <SelectItem
					className="focus:bg-magic-550 cursor-pointer"
					value="or_stars=desc"
				>
					Most stars
				</SelectItem>
				<SelectItem
					className="focus:bg-magic-550 cursor-pointer"
					value="or_stars=asc"
				>
					Low stars
				</SelectItem> */}
			</SelectContent>
		</Select>
	);
};
