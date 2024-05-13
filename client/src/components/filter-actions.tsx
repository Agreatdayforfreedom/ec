import { FilterByPrice } from './filter-by-price';
import { FilterByStars } from './filter-by-stars';

interface Props {
	onCloseSheet?: (val: boolean) => void;
}

export const FilterActions = ({ onCloseSheet }: Props) => {
	return (
		<div className="mt-6 space-y-5">
			<FilterByPrice onCloseSheet={onCloseSheet} />
			<FilterByStars onCloseSheet={onCloseSheet} />
		</div>
	);
};
