import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { logout } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Nav = () => {
	const { isAuth, user } = useAppSelector((state) => state.auth);
	const { items } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	return (
		<div className="h-full flex items-center space-x-2">
			{isAuth && user ? (
				<>
					<Link
						to="/cart"
						className="flex space-x-1 items-end mr-2 hover:bg-magic-500/50 p-1.5 rounded-full"
					>
						<ShoppingCart className="" />
						<span className=" h-5 w-5 bg-magic-500 flex justify-center items-center text-xs font-extrabold rounded-full">
							{items?.length}
						</span>
					</Link>
					<div className="text-sm text-magic-100 font-semibold">
						Welcome <span>{user.username}</span>
					</div>
					<div className="h-8 w-px">
						<Separator orientation="vertical" className="bg-magic-600" />
					</div>
					<Button
						variant={'link'}
						className="hover:no-underline px-0  text-magic-600 hover:text-magic-600/60 font-semibold"
						onClick={() => dispatch(logout())}
					>
						Log out
					</Button>
				</>
			) : (
				<>
					<Link
						className="hover:no-underline px-0  text-sm text-magic-600 hover:text-magic-600/60 font-semibold"
						to="/signup"
					>
						Sign up
					</Link>
					<div className="h-8 w-px">
						<Separator orientation="vertical" className="bg-magic-600" />
					</div>
					<Link
						className="hover:no-underline px-0 text-sm text-magic-600 hover:text-magic-600/60 font-semibold"
						to="/signin"
					>
						Sign in
					</Link>
				</>
			)}
		</div>
	);
};
