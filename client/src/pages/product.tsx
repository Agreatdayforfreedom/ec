import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product as IProduct } from '@/interfaces';
import { Button } from '@/components/ui/button';
import { Stars } from '@/components/review/stars';

import { ReviewsSection } from './reviews-section';

export const Product = () => {
	const params = useParams();
	const [product, setProduct] = useState<IProduct>();
	useEffect(() => {
		async function get() {
			const result = await axios.get(`/product/${params.id}`);
			setProduct(result.data);
		}
		get();
	}, []);
	if (!product) return <p>loding</p>;
	return (
		<div className="pt-5">
			<div className="md:flex md:max-w-[95%]  mx-auto">
				<div className="flex justify-center">
					<img
						src={product.image}
						alt={product.title}
						className="h-96 w-auto"
					/>
				</div>
				<section className="mt-4 flex-1">
					<div className="p-3 space-y-5">
						<div>
							<h2 className="text-2xl font-semibold">{product.title}</h2>
							<div className="mt-2 ml-2 flex items-end space-x-1">
								<span className="text-magic-300 mr-1">
									{product.averageRate}
								</span>
								<Stars _static size={20} stars={product.averageRate} />
								<span className="">({product.totalReviews})</span>
							</div>
							<p className="mx-2 mt-5 text-magic-50">{product.description}</p>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-semibold text-green-600">
								${product.price}
							</span>
							<div>
								<Button variant="magic">Add to card</Button>
							</div>
						</div>
					</div>
				</section>
			</div>
			<ReviewsSection productId={product.id} />
		</div>
	);
};
