import { Link } from 'react-router-dom';
import { Nav } from './nav';

export const Header = () => {
	return (
		<header className="w-full h-20 bg-magic-800 flex justify-between">
			<Link to="/" aria-label="home logo link">
				<img src="/logo.png" className="w-16 h-16 object-contain m-2" />
			</Link>
			<Nav />
		</header>
	);
};
