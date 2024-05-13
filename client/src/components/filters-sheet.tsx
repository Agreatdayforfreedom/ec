import { useState } from 'react';
import { ArrowDownWideNarrow } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { FilterActions } from './filter-actions';

export const FiltersSheet = () => {
	const [open, setOpen] = useState(false);

	const onClose = (val: boolean) => {
		console.log(val);
		setOpen(val);
	};
	return (
		<div className="w-full flex justify-center md:hidden">
			<Sheet open={open} onOpenChange={onClose}>
				<SheetTrigger asChild>
					<Button
						variant={'ghost'}
						className="flex mt-4 space-x-1 justify-center hover:bg-magic-500/50"
					>
						<ArrowDownWideNarrow size={18} />
						<span className="text-lg">Filter</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side={'left'}
					className="w-[400px] sm:w-[540px] bg-magic-800 border-magic-500"
				>
					<FilterActions onCloseSheet={onClose} />
				</SheetContent>
			</Sheet>
		</div>
	);
};
