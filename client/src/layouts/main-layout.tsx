import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/rtk';
import { profileThunk } from '../features/auth/authApi';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/header';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<main className="h-full">
				<Outlet />
			</main>
		</>
	);
};
