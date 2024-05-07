import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Product {
	id: string;
	image: string;
	title: string;
	description: string;
	author: string;
	price: number;
	stock: number;
}
interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
	return (
		<Card className="w-52 p-3 rounded-none bg-transparent border-none ">
			<CardHeader className="p-0 m-0 hover:shadow-lg hover:shadow-magic-100/30">
				<Link to={`/product/${product.id}`}>
					<img
						src={product.image}
						alt={product.title}
						className="h-64 w-full"
					/>
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
