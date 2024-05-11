import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { ProductCard } from '@/components/product/product-card';
import { getProducts } from '@/features/product/productApi';
import Loader from '@/components/loader';
import { Product } from '@/interfaces';
import useQueryParams from '@/hooks/use-query-params';

export const Home = () => {
	const dispatch = useAppDispatch();
	const { loading, products } = useAppSelector((state) => state.product);
	const [params] = useQueryParams();

	useEffect(() => {
		dispatch(getProducts(params));
	}, [params]);

	if (loading) return <Loader />;
	return (
		<section className="grid grid-cols-5 p-5">
			{products.map((product: Product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</section>
	);
};
