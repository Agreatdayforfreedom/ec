import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { MainLayout } from '@/layouts/main-layout';
import { Signin } from '@/pages/signin';
import { Signup } from '@/pages/signup';
import { Home } from '@/pages/home';
import { Product } from '@/pages/product';
import SessionGuard from '@/guard/session-guard';
import { useAppDispatch } from '@/hooks/rtk';
import { profileThunk } from '@/features/auth/authApi';
import { getCartThunk } from '@/features/cart/cartApi';
import { Cart } from '@/pages/cart';
import { Orders } from './pages/orders';
import Order from './pages/order';

function App() {
	axios.defaults.baseURL = 'http://localhost:4000';
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(profileThunk());
		dispatch(getCartThunk());
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
				<Route path="/cart" element={<Cart />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/order/:id" element={<Order />} />
			</Route>
		</Routes>
	);
}

export default App;
