import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { logout } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Nav = () => {
	const { isAuth, user } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	return (
		<div className="h-full flex items-center space-x-2">
			{isAuth && user ? (
				<>
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
