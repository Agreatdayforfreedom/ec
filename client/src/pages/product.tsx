import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Product as IProduct } from '@/interfaces';
import { Button } from '@/components/ui/button';
import { Stars } from '@/components/review/stars';
import Loader from '@/components/loader';

import { ReviewsSection } from './reviews-section';
import { useAppDispatch, useAppSelector } from '../hooks/rtk';
import { addItemThunk } from '../features/cart/cartApi';
import { useToast } from '../components/ui/use-toast';
import { Gem } from 'lucide-react';

export const Product = () => {
	const params = useParams();
	const [product, setProduct] = useState<IProduct>();

	const { isAuth } = useAppSelector((state) => state.auth);
	const { success } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function get() {
			const result = await axios.get(`/product/${params.id}`);
			setProduct(result.data);
		}
		get();
	}, []);

	const { toast } = useToast();

	useEffect(() => {
		if (success) {
			toast({
				className: 'bg-magic-550 border-magic-500',
				title: success.message,
			});
		}
	}, [success]);
	if (!product) return <Loader />;
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
									{product.rating.avg.toFixed(2)}
								</span>
								<Stars _static size={20} stars={product.rating.avg} />
								<span className="">({product.rating._count?.reviews})</span>
							</div>
							<p className="mx-2 mt-5 text-magic-50">{product.description}</p>
						</div>
						{product.saga && (
							<div className="flex flex-col">
								<Link
									className="font-semibold text-magic-200 hover:underline"
									to={`/saga/${product.saga.id}`}
								>
									Book {product.order} of {product.saga._count?.products}:{' '}
									{product.saga.name}
								</Link>
								<span className="font-semibold text-slate-300"></span>
							</div>
						)}
						<div className="flex items-center justify-between">
							<div className="flex flex-col">
								<span className="font-semibold text-green-600">
									${product.price}
								</span>
								<div className="flex items-end space-x-1">
									<Gem size={18} className="stroke-sky-500" />
									<span className="mt-1 font-semibold">
										{product.gems_price}
									</span>
								</div>
							</div>
							<div>
								{isAuth && (
									<Button
										variant="magic"
										onClick={() => dispatch(addItemThunk(product.id))}
									>
										Add to card
									</Button>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
			<ReviewsSection ratingId={product.ratingId} />
		</div>
	);
};
