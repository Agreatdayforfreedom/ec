import { ChangeEvent, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';

import { Order as IOrder, OrderStatus } from '@/interfaces';
import Loader from '@/components/loader';
import { Button } from '../components/ui/button';
import { Coins, CreditCard } from 'lucide-react';
import { useAppSelector } from '../hooks/rtk';

enum PaymentMethod {
	CREDITCARD = 'credit-card',
	CREDITS = 'credits',
}

export const Payment = () => {
	const [order, setOrder] = useState<IOrder>();
	const [loading, setLoading] = useState<boolean>(true);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
		PaymentMethod.CREDITS,
	);

	const auth = useAppSelector((state) => state.auth);

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

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPaymentMethod(e.target.value as PaymentMethod);
	};

	const onClick = async () => {
		const token = localStorage.getItem('access_token');
		const config: AxiosRequestConfig = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		if (order)
			if (paymentMethod === PaymentMethod.CREDITS) {
				await axios.post(`/checkout/gems/${order.id}`, {}, config);
			} else {
				console.log('IMPLEMENT THIS FUNCTIONALITY');
			}
	};
	if (loading || !order) return <Loader />;
	if (order.orderStatus === OrderStatus.PURCHASED)
		return <Navigate to={`/order/${order.id}`} />;
	return (
		<div className="h-full flex items-center justify-center">
			<div className="border border-magic-500 w-96 h-80 rounded flex flex-col justify-between">
				<h2 className="text-lg p-2 border-b border-magic-500 font-semibold">
					Select payment method
				</h2>

				<div className="w-fit mx-auto space-y-2">
					<div className="space-x-1 flex">
						<Coins className="mr-4" />
						<input
							onChange={onChange}
							value={PaymentMethod.CREDITS}
							checked={paymentMethod === PaymentMethod.CREDITS}
							type="checkbox"
							id="credits"
						/>
						<label className="font-semibold" htmlFor="credits">
							Credits{' '}
							{auth.user?.gems && auth.user?.gems >= order.subtotal_gems ? (
								<span className="text-sm text-green-500">(Enough gems!)</span>
							) : (
								<span className="text-sm text-red-500">
									(You need {order.subtotal_gems - auth.user?.gems!} more!)
								</span>
							)}
						</label>
					</div>

					<div className="space-x-1 flex">
						<CreditCard className="mr-4" />
						<input
							onChange={onChange}
							value={PaymentMethod.CREDITCARD}
							checked={paymentMethod === PaymentMethod.CREDITCARD}
							type="checkbox"
							id="credit-card"
						/>
						<label className="font-semibold" htmlFor="credit-card">
							Credit Card
						</label>
					</div>
				</div>

				<Button
					variant="magic"
					className="rounded-none"
					size="sm"
					onClick={onClick}
				>
					Buy
				</Button>
			</div>
		</div>
	);
};
