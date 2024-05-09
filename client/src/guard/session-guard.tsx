import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/rtk';

const SessionGuard = () => {
	const { isAuth, await_prof } = useAppSelector((state) => state.auth);

	if (!await_prof) return <></>;
	if (isAuth) return <Navigate to="/" />;
	return <Outlet />;
};

export default SessionGuard;
