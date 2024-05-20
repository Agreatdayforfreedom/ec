import axios from 'axios';
import { useEffect, useState } from 'react';

import { Review as IReview, ORDER_BY, Query } from '@/interfaces';
import { Separator } from '@/components/ui/separator';
import { ReviewActions } from '@/components/review/review-actions';
import LoadMore from '@/components/review/load-more';
import useQueryParams from '@/hooks/use-query-params';
import { Reviews } from '@/components/review/reviews';

interface Props {
	ratingId: string;
}

export const ReviewsSection = ({ ratingId }: Props) => {
	const [reviews, setReviews] = useState<IReview[]>();
	const [count, setCount] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [query] = useQueryParams();
	useEffect(() => {
		setLoading(true);
		let qp = query && query;
		async function getAll() {
			const reviews = await axios(`/reviews/${ratingId}${qp}`);
			setReviews(reviews.data.reviews);
			setCount(reviews.data.count);
			setLoading(false);
		}
		getAll();
	}, []);

	const filterBy = async ({
		order_by = ORDER_BY.DESC,
		stars,
		take = 5,
	}: Query) => {
		setLoading(true);

		const reviews = await axios(
			`/reviews/${ratingId}?stars=${stars}&order_by=${order_by}&take=${take}`,
		);
		setReviews(reviews.data.reviews);
		setCount(reviews.data.count);
		setLoading(false);
	};
	console.log(count);
	return (
		<div className="p-3 justify-between space-y-3">
			<h2 className="text-2xl">Reviews ({count})</h2>
			<Separator orientation="horizontal" className="bg-magic-100" />
			<div className="md:w-3/4 flex flex-col md:flex-row justify-around ">
				<div className="flex-1 mx-3 space-y-5">
					<ReviewActions filterBy={filterBy} />
					<Reviews reviews={reviews} loading={loading} count={count} />
					<div className="text-end">
						{reviews && count > reviews.length && (
							<LoadMore loading={loading} filterBy={filterBy} />
						)}
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
};
