import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Product } from '@/interfaces';

interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
	return (
		<Card className="p-3 rounded-none w-fit mx-auto bg-transparent border-none ">
			<CardHeader className="p-0 m-0 hover:shadow-lg hover:shadow-magic-100/30">
				<Link to={`/product/${product.id}`}>
					<img src={product.image} alt={product.title} />
				</Link>
			</CardHeader>
			<CardContent className="p-0 flex flex-col">
				<Link
					to={`/product/${product.id}`}
					className="text-xl font-semibold hover:underline"
				>
					{product.title}
				</Link>
				<span className="font-semibold text-magic-600">{product.author}</span>
			</CardContent>
			<CardFooter className="p-0 font-semibold">
				<span className="text-green-600">${product.price}</span>
			</CardFooter>
		</Card>
	);
};
