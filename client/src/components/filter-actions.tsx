import { ElementRef, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useQueryParams from '../hooks/use-query-params';
import { Input } from './ui/input';
import { ChevronRight, X } from 'lucide-react';

interface Props {
	onCloseSheet?: (val: boolean) => void;
}

export const FilterActions = ({ onCloseSheet }: Props) => {
	const minRef = useRef<ElementRef<'input'>>(null);
	const maxRef = useRef<ElementRef<'input'>>(null);

	const [error, setError] = useState<boolean>(false);

	const [_, setParams, deleteParam] = useQueryParams();
	const [params] = useSearchParams();

	const [min, setMin] = useState(params.get('min_price'));
	const [max, setMax] = useState(params.get('max_price'));

	const filterBy = () => {
		setError(false);
		if (maxRef?.current?.value && minRef?.current?.value) {
			let max_price = maxRef?.current?.value;
			let min_price = minRef?.current?.value;
			if (parseInt(min_price, 10) > parseInt(max_price, 10))
				return setError(true);
			setMin(min_price);
			setMax(max_price);
			setParams({ min_price, max_price });
			onCloseSheet?.(false);
		}
	};

	const deleteFilters = () => {
		setError(false);

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
		<div className="mt-6">
			<span className="font-bold">Filter by Price</span>

			<div className="flex pl-1 mt-2 space-x-2">
				<Input
					ref={minRef}
					min={0}
					max={1000}
					defaultValue={min || ''}
					placeholder="Min"
					className="rounded-none h-6 bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
					type="number"
				/>
				<Input
					ref={maxRef}
					min={0}
					max={1000}
					placeholder="Max"
					defaultValue={max || ''}
					className="rounded-none h-6 bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
					type="number"
				/>
			</div>

			{error && (
				<p className="text-sm text-red-500 mt-1">
					Min cannot be greater than Max
				</p>
			)}
			<button
				onClick={() => {
					if (min && max) {
						deleteFilters();
						onCloseSheet?.(false);
					} else {
						filterBy();
					}
				}}
				className="bg-magic-500 w-full mt-2 justify-center flex p-1 text-xs items-center font-bold hover:bg-magic-500 cursor-pointer"
			>
				{min && max ? (
					<>
						Remove <X size={15} />
					</>
				) : (
					<>
						Filter <ChevronRight size={18} />
					</>
				)}
			</button>
		</div>
	);
};
