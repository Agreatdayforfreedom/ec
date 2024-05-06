import { useEffect } from 'react';
import { useAppSelector } from '../hooks/rtk';
import { Navigate } from 'react-router-dom';

export const AuthLayout = () => {
	const { isAuth } = useAppSelector((state) => state.auth);
	console.log('xd');
	useEffect(() => console.log(isAuth), []);
	if (isAuth) return <Navigate to="/" />;
	return <></>;
};
