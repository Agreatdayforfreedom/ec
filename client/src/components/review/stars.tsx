import styles from './star.module.css';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface Props {
	_static?: boolean;
	stars?: number;
	size?: number;
	onClick?: (currentRating: number) => void;
}

/**
 * @param _static Avoid actions if true.
 */
export const Stars = ({
	onClick,
	size = 25,
	stars = 0,
	_static = false,
}: Props) => {
	const [total, setTotal] = useState(stars);

	return (
		<div className="flex">
			{[...Array(5)].map((_, index) => {
				const currentRating = index + 1;

				let style =
					total > index
						? !_static
							? styles.star_hovered_pointer
							: styles.star_hovered
						: '';
				return (
					<Star
						key={index}
						size={size}
						className={style}
						onClick={() => !_static && onClick && onClick(currentRating)}
						onMouseEnter={() => !_static && setTotal(currentRating)}
						onMouseLeave={() => !_static && setTotal(0)}
					/>
				);
			})}
		</div>
	);
};
