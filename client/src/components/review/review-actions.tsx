import { Star } from 'lucide-react';
import { useState } from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { ORDER_BY, Query } from '@/interfaces';
import useQueryParams from '@/hooks/use-query-params';
import { useSearchParams } from 'react-router-dom';

interface Props {
	filterBy: (query: Query) => void;
}

export const ReviewActions = ({ filterBy }: Props) => {
	const [params] = useSearchParams();

	const [orderByValue, setOrderByValue] = useState(
		(params.get('order_by') as ORDER_BY) || ORDER_BY.ASC,
	);
	const [starsValue, setStarsValue] = useState(
		(params.get('stars') as string) || '',
	);

	const [_, setParams] = useQueryParams();

	const onOrderByChange = (value: ORDER_BY) => {
		setOrderByValue(value);
		setParams({ order_by: value });
		filterBy({
			stars: parseInt(starsValue, 10),
			order_by: value,
		});
	};

	const onStarsChange = (value: string) => {
		setStarsValue(value);
		setParams({ stars: value });

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
						return (
							<SelectItem
								key={i}
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
