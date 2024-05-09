import Review from '@/components/review/review';
import { Review as IReview } from '@/interfaces';
import { Separator } from '@/components/ui/separator';

interface Props {
	reviews: IReview[];
}

export const ReviewsSection = ({ reviews }: Props) => {
	return (
		<div className="p-3 md:flex justify-between">
			<p className="text-3xl">Stars</p>
			<Separator orientation="vertical" className="h-full" />
			<div>
				{reviews.map((r) => (
					<Review review={r} />
				))}
			</div>
		</div>
	);
};
