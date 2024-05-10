import { ChevronDown } from 'lucide-react';

import Review from '@/components/review/review';
import { Review as IReview } from '@/interfaces';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

	if (loading || !reviews) return <p>loading...</p>;
	return (
		<div className="p-3 justify-between space-y-3">
			<h2 className="text-2xl">Reviews</h2>
			<Separator orientation="horizontal" className="bg-magic-100" />
			<div className="md:w-3/4 flex flex-col md:flex-row justify-around ">
				<div className="flex-1 mx-3 space-y-5">
					<div className="flex justify-end space-x-3">
						<Button
							variant="magic"
							className="rounded-lg h-8 pr-1.5"
							size={'sm'}
						>
							Order by <ChevronDown size={18} className="mt-1 ml-1" />
						</Button>
						<Button
							variant="magic"
							className="rounded-lg h-8 pr-1.5"
							size={'sm'}
						>
							Rating <ChevronDown size={18} className="mt-1 ml-1" />
						</Button>
					</div>
					{reviews.map((r) => (
						<Review review={r} />
					))}
				</div>
				<div></div>
			</div>
		</div>
	);
};
