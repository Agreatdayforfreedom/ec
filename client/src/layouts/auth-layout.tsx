import { useAppSelector } from '../hooks/rtk';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthLayout = () => {
	const { isAuth, loading } = useAppSelector((state) => state.auth);
	if (isAuth && !loading) return <Navigate to="/" />;
	else
		return (
			<>
				<Outlet />
			</>
		);
};
