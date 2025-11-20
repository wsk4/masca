
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
								onClick={(e) => link.label === 'Salir' && handleLinkClick(e, link)}
								className={({ isActive }) =>
									`px-3 py-2 text-lg font-medium transition-all duration-300 ${isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-300 hover:text-red-500 hover:border-b-2 hover:border-red-500'
									}`
								}
							>
								{link.label}
							</NavLink>
						))}
					</div>

					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-300 hover:text-red-500 focus:outline-none transition-colors"
							aria-label="Toggle menu"
						>
							{isOpen ? (
								<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			<div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
				<div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm">
					{links.map((link, i) => (
						<NavLink
							key={i}
							to={link.to}
							onClick={(e) => handleLinkClick(e, link)}
							className={({ isActive }) => `block px-3 py-2 text-base font-medium rounded-md transition-all duration-300 ${isActive ? 'text-red-500 bg-red-900/30' : 'text-gray-300 hover:text-red-500 hover:bg-red-900/20'}`} >
							{link.label}
						</NavLink>
					))}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;