import { Button } from '@/components/ui/button';
import { Query } from '@/interfaces';
import { useSearchParams } from 'react-router-dom';
import useQueryParams from '@/hooks/use-query-params';

interface Props {
	loading: boolean;
	filterBy: (query: Query) => void;
}

const LoadMore = ({ loading, filterBy }: Props) => {
	const [params] = useSearchParams();
	const [_, setParams] = useQueryParams();
	const handleLoad = () => {
		let take = parseInt(params.get('take') || '5', 10);
		setParams({ take: (take + 5).toString() });
		filterBy({ take: take + 5 });
	};

	return (
		<Button
			onClick={handleLoad}
			type="button"
			size="sm"
			className="rounded-lg"
			variant="magic"
			disabled={loading}
		>
			Load more
		</Button>
	);
};

export default LoadMore;
