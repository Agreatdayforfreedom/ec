import { Routes, Route } from 'react-router-dom';

import { MainLayout } from '@/layouts/main-layout';
import { Signin } from '@/pages/signin';
import { Signup } from '@/pages/signup';
import { Home } from '@/pages/home';
import { Product } from '@/pages/product';
import axios from 'axios';
import SessionGuard from '@/guard/session-guard';
import { useAppDispatch } from '@/hooks/rtk';
import { useEffect } from 'react';
import { profileThunk } from './features/auth/authApi';

function App() {
	axios.defaults.baseURL = 'http://localhost:4000';
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(profileThunk());
	}, []);
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route element={<SessionGuard />}>
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
				</Route>
				<Route index element={<Home />} />
				<Route path="/product/:id" element={<Product />} />
			</Route>
		</Routes>
	);
}

export default App;
