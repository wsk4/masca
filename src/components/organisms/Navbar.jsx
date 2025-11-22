import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaShoppingCart, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

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
		<nav className="bg-gradient-to-r from-black via-red-900 to-black text-white shadow-xl sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">

					{/* Logo / Title */}
					<div className="flex-shrink-0 flex items-center space-x-2">
						<span className="text-3xl font-extrabold tracking-wider text-red-500 drop-shadow-lg">
							{title}
						</span>
					</div>

					{/* Desktop Links */}
					<div className="hidden md:flex space-x-6">
						{links.map((link, i) => (
							<NavLink
								key={i}
								to={link.to}
								onClick={(e) => link.label === 'Salir' && handleLinkClick(e, link)}
								className={({ isActive }) =>
									`flex items-center space-x-2 px-3 py-2 text-lg font-semibold transition-all duration-300 rounded-md ${isActive
										? 'text-red-400 bg-black/40 border-b-2 border-red-500'
										: 'text-gray-200 hover:text-red-400 hover:bg-black/30'
									}`
								}
							>
								{/* Iconos dinámicos */}
								{link.label === 'Inicio' && <FaHome />}
								{link.label === 'Perfil' && <FaUser />}
								{link.label === 'Carrito' && <FaShoppingCart />}
								{link.label === 'Salir' && <FaSignOutAlt />}
								<span>{link.label}</span>
							</NavLink>
						))}
					</div>

					{/* Mobile Toggle */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-200 hover:text-red-400 focus:outline-none transition-colors"
							aria-label="Toggle menu"
						>
							{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
					}`}
			>
				<div className="px-4 pt-4 pb-6 space-y-2 bg-black/95 backdrop-blur-md rounded-b-lg shadow-lg">
					{links.map((link, i) => (
						<NavLink
							key={i}
							to={link.to}
							onClick={(e) => handleLinkClick(e, link)}
							className={({ isActive }) =>
								`flex items-center space-x-2 px-3 py-2 text-base font-medium rounded-md transition-all duration-300 ${isActive
									? 'text-red-400 bg-red-900/30'
									: 'text-gray-200 hover:text-red-400 hover:bg-red-900/20'
								}`
							}
						>
							{link.label === 'Inicio' && <FaHome />}
							{link.label === 'Perfil' && <FaUser />}
							{link.label === 'Carrito' && <FaShoppingCart />}
							{link.label === 'Salir' && <FaSignOutAlt />}
							<span>{link.label}</span>
						</NavLink>
					))}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
