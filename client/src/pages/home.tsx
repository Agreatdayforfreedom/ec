import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { ProductCard } from '@/components/product/product-card';
import { getProducts } from '@/features/product/productApi';
import Loader from '@/components/loader';
import { Product } from '@/interfaces';
import useQueryParams from '@/hooks/use-query-params';
import { Filters } from '@/components/filters';

export const Home = () => {
	const dispatch = useAppDispatch();
	const { loading, products, count } = useAppSelector((state) => state.product);
	const [params] = useQueryParams();

	useEffect(() => {
		dispatch(getProducts(params));
	}, [params]);

	return (
		<section className="flex">
			<Filters />
			{count} results
			{loading ? (
				<Loader />
			) : (
				<div className="flex-1 grid  gap-5 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6  p-5">
					{products.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</section>
	);
};
