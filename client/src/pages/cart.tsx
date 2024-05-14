import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/rtk';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/cart/cart-item';
import { useToast } from '@/components/ui/use-toast';

export const Cart = () => {
	const cart = useAppSelector((state) => state.cart);
	let totalPrice = cart.items?.reduce((ac, c) => {
		return ac + c.totalPrice;
	}, 0);

	let totalItems = cart.items?.reduce((ac, c) => {
		return ac + c.qty;
	}, 0);

	const { toast } = useToast();

	useEffect(() => {
		if (cart.success) {
			toast({
				className: 'bg-magic-550 border-magic-500',
				title: 'Updated!',
			});
		}
	}, [cart.success]);
	return (
		<div className="space-y-2 w-[95%] mx-auto mt-5 md:flex">
			<div className="space-y-2 overflow-y-scroll md:overflow-auto h-96 md:h-full md:w-[70%]">
				{cart.items?.map((item) => <CartItem key={item.id} item={item} />)}
			</div>

			<div className=" w-full md:w-auto flex-1 h-fit mx-2 border border-magic-400 rounded ">
				<h1 className="text-lg font-semibold border-b border-magic-400 p-2">
					Purchase summary
				</h1>
				<div className="p-2 flex flex-col items-end">
					<div className="space-x-2 w-full">
						<span>Subtotal ({totalItems})</span>
						<span className="font-bold">${totalPrice}</span>
					</div>
					<Button size="sm" className="" variant="magic">
						Buy
					</Button>
				</div>
			</div>
		</div>
	);
};
