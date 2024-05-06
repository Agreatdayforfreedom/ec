import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';
import { MainLayout } from './layouts/main-layout';
import { Home } from './pages/home';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthLayout } from './layouts/auth-layout';

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
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
