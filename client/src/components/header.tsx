import { Link } from 'react-router-dom';

import { Nav } from './nav';
import { Search } from './search';

export const Header = () => {
	return (
		<header className="h-20 w-full px-4 border-b border-magic-400 shadow-lg shadow-magic-200/10 bg-magic-800  flex justify-between">
			<Link to="/" aria-label="home logo link">
				<img src="/logo.png" className="w-16 h-16 object-contain m-2" />
			</Link>
			<Search />
			<Nav />
		</header>
	);
};
