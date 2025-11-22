import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ links, title }) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/login');
		setIsOpen(false);
	};

	const handleLinkClick = (e, link) => {
		if (link.label === 'Salir') {
			e.preventDefault();
			handleLogout();
		} else {
			setIsOpen(false);
		}
	};

	return (
		<nav className="bg-black text-white shadow-lg sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0">
						<h1 className="text-2xl font-bold tracking-wider text-red-600">
							{title}
						</h1>
					</div>

					<div className="hidden md:flex space-x-8">
						{links.map((link, i) => (
							<NavLink
								key={i}
								to={link.to}
								onClick={(e) => handleLinkClick(e, link)}
								className={({ isActive }) =>
									`px-3 py-2 text-lg font-medium transition-all duration-300 ${isActive
										? 'text-red-500 border-b-2 border-red-500'
										: 'text-gray-300 hover:text-red-500 hover:border-b-2 hover:border-red-500'
									}`
								}
							>
								{link.label}
							</NavLink>
						))}
					</div>
				</div>
			</div>

		</nav>
	);
}

export default Navbar;