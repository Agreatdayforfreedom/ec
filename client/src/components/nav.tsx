import { useAppDispatch, useAppSelector } from '../hooks/rtk';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { logout } from '../features/auth/authSlice';

export const Nav = () => {
	const { isAuth, loading, user } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	if (loading) return <div className="w-32 h-10 bg-red-800"></div>;
	return (
		<div>
			{isAuth && user ? (
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
