import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import useQueryParams from '../hooks/use-query-params';

export const Search = () => {
	const inputRef = useRef<ElementRef<'input'>>(null);

	const [_, setParams] = useQueryParams();

	const onSearch = () => {
		if (inputRef?.current?.value && inputRef.current.value.trim() !== '') {
			setParams({ search: inputRef.current.value.trim() }, { navigate: '/' });
		}
	};

	return (
		<div className="flex items-center">
			<Input
				ref={inputRef}
				placeholder="Search"
				className="rounded-none bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
			/>
			<Button
				type="button"
				onClick={onSearch}
				variant="magic"
				className="rounded-none px-3"
			>
				<SearchIcon />
			</Button>
		</div>
	);
};
