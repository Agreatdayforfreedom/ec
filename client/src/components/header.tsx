import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '../hooks/rtk';
import { logout } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
	const { isAuth, loading, user } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<div className="w-full h-20 bg-violet-900 flex justify-between">
			<h1>Header</h1>
			{isAuth && !loading ? (
				<>
					{user.username}
					<Button onClick={() => dispatch(logout())}>Log out</Button>
				</>
			) : (
				<>
					<Link to="/signin">Sign in</Link>
				</>
			)}
		</div>
	);
};
