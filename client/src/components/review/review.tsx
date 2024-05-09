import moment from 'moment';

import { Review as IReview } from '@/interfaces';
import { Separator } from '@/components/ui/separator';

import { Stars } from './stars';

interface Props {
	review: IReview;
}

const Review = ({ review }: Props) => {
	return (
		<div className="flex-1">
			<div className="flex justify-between">
				<span className="font-semibold text-magic-100 text-lg">
					{review.user.username}
				</span>
				<span className="text-xs font-semibold">
					{moment(review.created_at).format('MMM Do YY')}
				</span>
			</div>
			<div className="px-2 space-y-2">
				<p className="text-sm font-semibold">{review.text}</p>
				<Stars _static stars={review.stars} size={20} />
			</div>
			<Separator className="bg-magic-100 mt-2" />
		</div>
	);
};

export default Review;
