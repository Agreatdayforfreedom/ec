import Review from '@/components/review/review';
import { Review as IReview } from '@/interfaces';
import { Separator } from '@/components/ui/separator';
import { ReviewForm } from '@/components/review/review-form';
import { Button } from '../components/ui/button';
import { ArrowDown, ChevronDown } from 'lucide-react';

interface Props {
	reviews: IReview[];
}

export const ReviewsSection = ({ reviews }: Props) => {
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
