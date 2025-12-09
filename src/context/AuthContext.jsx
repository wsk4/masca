import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al recargar la página, verificamos si tenemos sesión guardada
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        } else {
            // Si falta algo, limpiamos todo para evitar estados inconsistentes
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Guardamos los datos del usuario en localStorage
        // NOTA: El token ya lo guarda el UsuarioService, aquí solo manejamos el objeto usuario
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // ¡Importante eliminar el token!
        setUser(null);
        window.location.href = '/login'; // Forzamos recarga y redirección
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};