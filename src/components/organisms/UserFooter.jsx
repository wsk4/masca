// src/components/organisms/UserFooter.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function UserFooter() {
    const currentYear = new Date().getFullYear();

    const links = {
        descubrir: [
            { to: "/catalogo", label: "Catálogo completo" },
            { to: "/", label: "Novedades" }, 
            { to: "/contacto", label: "Contacto" },
        ],
        miCuenta: [
            { to: "/perfil", label: "Mi Perfil" },
            { to: "/compras", label: "Mis Compras" },
            { to: "/carrito", label: "Mi Carrito" },
            { to: "/login", label: "Iniciar sesión" },
        ],
        soporte: [
            { to: "/ayuda", label: "Centro de Ayuda" },
            { to: "/envios", label: "Envíos y Devoluciones" },
            { to: "/legal/privacidad", label: "Política de Privacidad" },
            { to: "/legal/terminos", label: "Términos de Servicio" },
        ]
    };

    return (
        <footer className="bg-theme-main text-theme-muted p-10 mt-16 border-t border-theme-border">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    
                    {/* Columna 1: Marca y Slogan */}
                    <div>
                        <h3 className="text-2xl font-black text-white mb-3">
                            Mascapito Store
                        </h3>
                        <p className="text-sm">
                            Elegancia y exclusividad en cada esencia.
                        </p>
                    </div>

                    {/* Columna 2: Descubrir */}
                    <div>
                        <h5 className="font-semibold text-white mb-4">Descubrir</h5>
                        <ul className="space-y-2 text-sm">
                            {links.descubrir.map(link => (
                                <li key={link.to}>
                                    <NavLink to={link.to} className="hover:text-theme-accent">
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3: Mi Cuenta */}
                    <div>
                        <h5 className="font-semibold text-white mb-4">Mi Cuenta</h5>
                        <ul className="space-y-2 text-sm">
                            {links.miCuenta.map(link => (
                                <li key={link.to}>
                                    <NavLink to={link.to} className="hover:text-theme-accent">
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 4: Soporte y Contacto/Redes */}
                    <div>
                        <h5 className="font-semibold text-white mb-4">Soporte y Legal</h5>
                        <ul className="space-y-2 text-sm">
                            {links.soporte.map(link => (
                                <li key={link.to}>
                                    <a href={link.to} className="hover:text-theme-accent">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex space-x-4 mt-6 text-xl">
                            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN INFERIOR: COPYRIGHT --- */}
                <div className="border-t border-theme-border pt-6 text-center text-sm">
                    &copy; {currentYear} Mascapitos Store. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default UserFooter;