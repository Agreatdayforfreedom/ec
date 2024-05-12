import { ElementRef, useRef, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import useQueryParams from '@/hooks/use-query-params';

export const Filters = () => {
	const minRef = useRef<ElementRef<'input'>>(null);
	const maxRef = useRef<ElementRef<'input'>>(null);
	const [_, setParams, deleteParam] = useQueryParams();
	const [params] = useSearchParams();

	const [min, setMin] = useState(params.get('min_price'));
	const [max, setMax] = useState(params.get('max_price'));

	const filterBy = () => {
		if (maxRef?.current?.value && minRef?.current?.value) {
			let max_price = maxRef?.current?.value;
			let min_price = minRef?.current?.value;
			if (parseInt(min_price, 10) > parseInt(max_price, 10)) return;
			setParams({ min_price, max_price });
		}
	};

	const deleteFilters = () => {
		deleteParam('min_price');
		deleteParam('max_price');
		if (minRef?.current && maxRef?.current) {
			minRef.current.value = '';
			maxRef.current.value = '';
			setMin('');
			setMax('');
		}
	};

	return (
		<div className="w-[25%] md:w-[15%] h-screen px-2 border-r border-magic-300">
			<span className="font-bold">Price</span>

			<div className="flex pl-1 mt-2 space-x-2">
				<Input
					ref={minRef}
					defaultValue={min || ''}
					placeholder="Min"
					className="rounded-none h-6 bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
					type="number"
				/>
				<Input
					ref={maxRef}
					placeholder="Max"
					defaultValue={max || ''}
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
			{maxRef?.current?.value && minRef?.current?.value && (
				<div className="w-full flex justify-center mt-1">
					<button
						onClick={deleteFilters}
						className="bg-magic-300 flex p-1 text-xs items-center font-bold hover:bg-magic-500 cursor-pointer"
					>
						Remove <X size={15} />
					</button>
				</div>
			)}
		</div>
	);
};
