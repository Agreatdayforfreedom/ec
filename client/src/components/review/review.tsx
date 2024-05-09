import { Review as IReview } from '@/interfaces';
import { Separator } from '../ui/separator';

interface Props {
	review: IReview;
}

const Review = ({ review }: Props) => {
	return (
		<div className="flex-1 px-1">
			<div>
				<span className="font-semibold text-magic-100 text-lg">
					{review.user.username}
				</span>
			</div>
			<div className="px-2">
				<p className="text-sm font-semibold">{review.text}</p>
				<span>{review.stars}</span>
			</div>
			<Separator className="bg-magic-100 mt-2" />
		</div>
	);
};

export default Review;
