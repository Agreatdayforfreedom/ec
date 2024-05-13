import { FiltersSheet } from './filters-sheet';
import { FilterActions } from './filter-actions';

export const Filters = () => {
	return (
		<>
			<FiltersSheet />
			<div className="hidden md:block md:w-[30%]  h-screen px-2 border-r border-magic-300">
				<FilterActions />
			</div>
		</>
	);
};
