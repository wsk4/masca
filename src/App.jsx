import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { publicLinks } from './data/navbarPublicLinks';
import { adminLinks } from './data/navbarAdminLinks.js';
import Navbar from './components/organisms/Navbar.jsx';
import UserFooter from './components/organisms/UserFooter.jsx'; // 👈 1. Importación del footer
import { appRoutes } from './routes/config.jsx';

function Layout() {
  const location = useLocation();

  // Detecta rutas admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Encuentra la ruta actual en appRoutes
  const currentRoute = appRoutes.find(route =>
    route.path === location.pathname ||
    (route.path.includes(':') && location.pathname.startsWith(route.path.split('/:')[0]))
  );
  // navbar sólo en rutas públicas con showNavbar true o rutas admin
  const showNavbar = isAdminRoute || currentRoute?.showNavbar;

  // Links y título del navbar
  const navbarLinks = isAdminRoute ? adminLinks : publicLinks;
  const navbarTitle = isAdminRoute ? 'Admin Mascapitos' : 'Usuario Mascapitos';

  return (
    // 👈 2. Se reemplaza el fragmento <> por un div para el layout "sticky footer"
    <div className="flex flex-col min-h-screen"> 
      {showNavbar && <Navbar links={navbarLinks} title={navbarTitle} />}
      
      {/* 👈 3. Se añade la clase flex-grow para empujar el footer */}
      <main className="flex-grow"> 
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>
      
      {/* 👈 4. Renderizado condicional del footer fuera del main */}
      {!isAdminRoute && <UserFooter />} 
    </div>
  );
}

function App() {
  return <Layout />;
}

export default App; 