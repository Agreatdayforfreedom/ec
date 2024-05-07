import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@/store';

import { MainLayout } from '@/layouts/main-layout';
import { AuthLayout } from '@/layouts/auth-layout';
import { Signin } from '@/pages/signin';
import { Signup } from '@/pages/signup';
import { Home } from '@/pages/home';
import { Product } from '@/pages/product';

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route element={<MainLayout />}>
						<Route element={<AuthLayout />}>
							<Route path="/signin" element={<Signin />} />
							<Route path="/signup" element={<Signup />} />
						</Route>
						<Route index element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
