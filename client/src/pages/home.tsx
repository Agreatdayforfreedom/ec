import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/rtk';

import { ProductCard } from '@/components/product/product-card';
import { getProducts } from '@/features/product/productApi';

export const Home = () => {
	const dispatch = useAppDispatch();
	const { loading, products } = useAppSelector((state) => state.product);
	useEffect(() => {
		dispatch(getProducts());
	}, []);

	if (loading) return <p>Loading...</p>;
	return (
		<section className="grid grid-cols-5 p-5">
			{products.map((product: any) => (
				<ProductCard key={product.id} product={product} />
			))}
		</section>
	);
};
