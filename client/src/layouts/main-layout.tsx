import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/rtk';
import { profileThunk } from '../features/auth/authApi';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/header';

export const MainLayout = () => {
	const { isAuth } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(profileThunk());
	}, []);

	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};
