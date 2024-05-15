import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';

import { Order as IOrder, OrderStatus } from '@/interfaces';
import Loader from '@/components/loader';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Order = () => {
	const [order, setOrder] = useState<IOrder>();
	const [loading, setLoading] = useState<boolean>(true);

	const params = useParams();

	useEffect(() => {
		async function fetch() {
			const token = localStorage.getItem('access_token');
			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axios(`/order/${params.id}/`, config);
			setOrder(res.data);
			setLoading(false);
		}
		fetch();
	}, []);

	if (loading || !order) return <Loader />;
	return (
		<div className="flex flex-col">
			<h1 className="p-4 text-2xl font-semibold">Order #{order.id}</h1>
			<Separator className="bg-magic-200" />

			<div className="px-1 py-5">
				<div className="flex border-b-2 mb-1 border-magic-200/50 justify-around ">
					<div className="w-20 px-2 font-bold">Image</div>
					<div className="flex-1 px-2 font-bold ">Title</div>
					<div className="flex-1 px-2 font-bold ">Qty</div>
					<div className="flex-1 px-2 font-bold ">Price</div>
				</div>
				{order.order_items?.map((item) => (
					<div className="flex border-y border-x border-x-magic-200/50 border-magic-200 ">
						<img
							src={item.product.image}
							alt={item.product.title}
							className="w-20 p-1"
						/>
						<div className="flex-1 p-1 font-semibold">{item.product.title}</div>
						<div className="flex-1 p-1 border-l  font-semibold border-magic-200/50">
							{item.qty}
						</div>
						<div className="flex-1 p-1 border-l text-green-500 font-semibold border-magic-200/50">
							${item.totalPrice}
						</div>
					</div>
				))}
				<div className="mt-5 p-2 ">
					<div className="flex border-b-2 border-magic-200/50">
						<div className="font-semibold flex-1">Id</div>
						<div className="font-semibold flex-1">Items</div>
						<div className="font-semibold flex-1">Status</div>
						<div className="font-semibold flex-1">Subtotal</div>
					</div>
					<div className="flex py-2 border-b border-magic-200/50">
						<div className="font-semibold flex-1">{order.id}</div>

						<div className="font-semibold flex-1">{order.totalItems}</div>
						<div
							className={cn(
								'font-semibold flex-1',
								order.orderStatus === OrderStatus.PENDING
									? 'text-orange-600'
									: 'text-magic-600',
							)}
						>
							{order.orderStatus}
						</div>
						<div className="font-semibold flex-1">{order.subtotal}</div>
					</div>
					<div className="mt-5 flex justify-end">
						<Button variant={'magic'}>Continue</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;
