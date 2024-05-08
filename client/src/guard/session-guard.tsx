import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/rtk';
import { useEffect } from 'react';

const SessionGuard = () => {
	const { isAuth, loading } = useAppSelector((state) => state.auth);

	// if (loading) return <></>;
	if (isAuth) return <Navigate to="/" />;
	return <Outlet />;
};

export default SessionGuard;
