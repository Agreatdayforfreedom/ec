import { useState } from 'react';
import { Stars } from './review/stars';
import { cn } from '../lib/utils';
import useQueryParams from '../hooks/use-query-params';
import { useSearchParams } from 'react-router-dom';

interface Props {
	onCloseSheet?: (val: boolean) => void;
}
export const FilterByStars = ({ onCloseSheet }: Props) => {
	const [params] = useSearchParams();
	const [cStar, setCStars] = useState<number>(
		parseInt(params.get('stars') || '0'),
	);

	const [_, setParams, deleteParam] = useQueryParams();

	const onClick = (star: number) => {
		setCStars(star);
		if (!star) {
			deleteParam('stars');
		} else {
			setParams({ stars: star.toString() });
		}
	};

	return (
		<div>
			<span className="font-bold">Filter by Stars</span>

			<div className="space-y-2">
				<button onClick={() => onClick(0)}>All</button>
				{[...Array(5)].map((_, i) => (
					<button
						key={i}
						onClick={() => onClick(i + 1)}
						className="[&>span]:hover:bg-slate-200/20  flex items-center ml-2 space-x-3 font-semibold"
					>
						<span
							className={cn(
								'font-mono rounded-full w-6 h-6',
								i + 1 === cStar && 'bg-magic-600/50',
							)}
						>
							{i + 1}
						</span>
						<Stars _static size={20} stars={i + 1} />
					</button>
				))}
			</div>
		</div>
	);
};
