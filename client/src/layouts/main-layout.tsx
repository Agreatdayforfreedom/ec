import { Outlet } from 'react-router-dom';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<main className="h-full">
				<Toaster />
				<Outlet />
			</main>
		</>
	);
};
