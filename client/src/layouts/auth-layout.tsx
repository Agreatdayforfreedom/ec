import { useAppSelector } from '../hooks/rtk';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthLayout = () => {
	const { isAuth } = useAppSelector((state) => state.auth);
	if (isAuth) return <Navigate to="/" />;
	return (
		<>
			<Outlet />
		</>
	);
};
