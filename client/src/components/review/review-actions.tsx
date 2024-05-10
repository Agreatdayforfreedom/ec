import { Star } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import { ORDER_BY, Query } from '@/interfaces';
import { SelectValue } from '@radix-ui/react-select';
import { useState } from 'react';

interface Props {
	filterBy: (query: Query) => void;
}

export const ReviewActions = ({ filterBy }: Props) => {
	const [starsValue, setStarsValue] = useState('');
	const [orderByValue, setOrderByValue] = useState(ORDER_BY.ASC);

	const onOrderByChange = (value: ORDER_BY) => {
		setOrderByValue(value);
		filterBy({
			stars: parseInt(starsValue, 10),
			order_by: value,
		});
	};

	const onStarsChange = (value: string) => {
		setStarsValue(value);
		filterBy({
			stars: parseInt(value, 10),
			order_by: orderByValue,
		});
	};

	return (
		<div className="flex justify-end space-x-3">
			<Select onValueChange={onStarsChange} defaultValue={starsValue}>
				<SelectTrigger className="bg-magic-500 hover:bg-magic-550 active:bg-magic-550/50 border-none w-32">
					<SelectValue placeholder="Stars" />
				</SelectTrigger>
				<SelectContent className="bg-magic-500 border-magic-550/50">
					{[...Array(6)].map((_, i) => {
						console.log(i);
						return (
							<SelectItem
								value={i.toString()}
								className="focus:bg-magic-550  cursor-pointer"
							>
								{i > 0 ? (
									<div className="flex">
										<Star />{' '}
										<span className="ml-1 text-base font-semibold">{i}</span>
									</div>
								) : (
									<span className="font-bold">All</span>
								)}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			<Select onValueChange={onOrderByChange} defaultValue={orderByValue}>
				<SelectTrigger className="bg-magic-500 hover:bg-magic-550 active:bg-magic-550/50 border-none w-32">
					<SelectValue placeholder="Order By" />
				</SelectTrigger>
				<SelectContent className="bg-magic-500 border-magic-550/50">
					<SelectItem
						value={ORDER_BY.DESC}
						className=" focus:bg-magic-550 cursor-pointer "
					>
						Top reviews
					</SelectItem>
					<SelectItem
						value={ORDER_BY.ASC}
						className="focus:bg-magic-550 cursor-pointer"
					>
						Most recent
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
