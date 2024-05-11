import { Review as IReview } from '@/interfaces';

import Review from './review';

interface Props {
	reviews: IReview[] | undefined;
	loading: boolean;
	count: number;
}

export const Reviews = ({ reviews, loading, count }: Props) => {
	if (loading) return <p>loading</p>;
	if (count === 0)
		return (
			<span className="flex justify-center mt-3 text-2xl font-semibold">
				No reviews yet
			</span>
		);
	return reviews?.map((r) => <Review key={r.id} review={r} />);
};
