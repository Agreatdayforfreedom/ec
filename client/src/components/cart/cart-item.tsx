import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Cart_Item } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { deleteItemThunk, updateQtyThunk } from '@/features/cart/cartApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Props {
	item: Cart_Item;
}

export const CartItem = ({ item }: Props) => {
	const [updateQty, setUpdateQty] = useState<number>(item.qty);
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((state) => state.cart);
	const UpdateQty = () => {
		dispatch(updateQtyThunk({ id: item.id, qty: updateQty }));
	};

	const onDelete = () => {
		dispatch(deleteItemThunk(item.id));
	};
	return (
		<div className="flex">
			<img className="w-20" src={item.product.image} alt={item.product.title} />
			<div className="flex flex-col ml-2 py-3 space-y-1">
				<Link
					to={`/product/${item.product.id}`}
					className="hover:underline font-semibold"
				>
					{item.product.title}
				</Link>
				<span>Total ${item.totalPrice}</span>
				<div className="flex items-center space-x-2">
					<div className="flex space-x-1">
						<Input
							type="number"
							className="w-12 h-6 px-1 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
							defaultValue={item.qty}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setUpdateQty(parseInt(e.target.value, 10))
							}
						/>
						{updateQty !== item.qty && (
							<Button
								size={'sm'}
								variant="magic"
								className="h-6 px-1 text-sm"
								onClick={UpdateQty}
								disabled={loading}
							>
								Update
							</Button>
						)}
					</div>

					<Separator orientation="vertical" className="bg-magic-600 h-3/4" />
					<button
						onClick={onDelete}
						disabled={loading}
						className="hover:text-red-500"
					>
						Delete
					</button>
				</div>
				{error && error.id === item.id && (
					<p className="text-sm text-red-500">{error.message}</p>
				)}
			</div>
		</div>
	);
};
