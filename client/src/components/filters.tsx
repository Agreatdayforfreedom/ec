import { ElementRef, useRef } from 'react';
import { Input } from './ui/input';
import { ChevronRight } from 'lucide-react';
import useQueryParams from '@/hooks/use-query-params';

export const Filters = () => {
	const minRef = useRef<ElementRef<'input'>>(null);
	const maxRef = useRef<ElementRef<'input'>>(null);
	const [_, setParams] = useQueryParams();

	const filterBy = () => {
		let min_price = minRef?.current?.value;
		let max_price = maxRef?.current?.value;
		if (min_price && max_price) {
			if (parseInt(min_price, 10) > parseInt(max_price, 10)) return;
			setParams({ min_price, max_price });
		}
	};

	return (
		<div className="w-[25%] md:w-[15%] h-screen px-2 border-r border-magic-300">
			<span className="font-bold">Price</span>
			<div className="flex pl-1 mt-2 space-x-2">
				<Input
					ref={minRef}
					placeholder="Min"
					className="rounded-none h-6 bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
					type="number"
				/>
				<Input
					ref={maxRef}
					placeholder="Max"
					className="rounded-none h-6 bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
					type="number"
				/>
				<button
					onClick={filterBy}
					className="bg-magic-550 rounded-full w-20 hover:bg-magic-550/50 cursor-pointer"
				>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
};
