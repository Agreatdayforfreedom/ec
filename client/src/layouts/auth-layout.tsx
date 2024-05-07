import { useAppSelector } from '../hooks/rtk';
import { Navigate } from 'react-router-dom';

export const AuthLayout = () => {
	const { isAuth } = useAppSelector((state) => state.auth);
	if (isAuth) return <Navigate to="/" />;
	return <></>;
};
