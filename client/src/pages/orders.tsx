import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { Order, OrderStatus } from '@/interfaces';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const Orders = () => {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('access_token');
		const config: AxiosRequestConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		async function fetch() {
			const res = await axios('/order', config);

			setOrders(res.data);
		}

		fetch();
	}, []);

	return (
		<div className="w-[95%] mx-auto mt-5">
			<h1 className="text-xl my-4">Orders</h1>
			{orders.length === 0 && (
				<div className="w-full flex justify-center text-2xl font-semibold">
					There is nothing to show here.
				</div>
			)}
			{orders.map((order) => (
				<div
					key={order.id}
					className="border-t last:border-y px-2 py-1 border-magic-300 even:bg-magic-550/50 flex flex-col space-y-1"
				>
					<Link
						className="hover:underline underline-offset-2"
						to={`/order/${order.id}`}
					>
						<span className="font-semibold text-lg">Order id: </span> {order.id}
					</Link>
					<div className="space-x-5">
						<span className="font-semibold">Subtotal:</span> ${order.subtotal}
						<span className="font-semibold">Items:</span> {order.totalItems}
					</div>
					<span
						className={cn(
							'font-semibold',
							order.orderStatus === OrderStatus.PENDING
								? 'text-orange-600'
								: 'text-magic-600',
						)}
					>
						{order.orderStatus}
					</span>
				</div>
			))}
		</div>
	);
};
