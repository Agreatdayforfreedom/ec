import { ChevronDown } from 'lucide-react';

import Review from '@/components/review/review';
import { Review as IReview, Query } from '@/interfaces';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReviewActions } from '../components/review/review-actions';

interface Props {
	productId: string;
}

export const ReviewsSection = ({ productId }: Props) => {
	const [reviews, setReviews] = useState<IReview[]>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		async function getAll() {
			const reviews = await axios(`/reviews/${productId}`);
			setReviews(reviews.data);
			setLoading(false);
		}
		getAll();
	}, []);

	const filterBy = async ({ order_by, stars }: Query) => {
		setLoading(true);

		const reviews = await axios(
			`/reviews/${productId}?stars=${stars}&order_by=${order_by}`,
		);
		setReviews(reviews.data);
		setLoading(false);
	};

	if (loading || !reviews) return <p>loading...</p>;
	return (
		<div className="p-3 justify-between space-y-3">
			<h2 className="text-2xl">Reviews</h2>
			<Separator orientation="horizontal" className="bg-magic-100" />
			<div className="md:w-3/4 flex flex-col md:flex-row justify-around ">
				<div className="flex-1 mx-3 space-y-5">
					<ReviewActions filterBy={filterBy} />
					{reviews.map((r) => (
						<Review review={r} />
					))}
				</div>
				<div></div>
			</div>
		</div>
	);
};
