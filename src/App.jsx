import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { publicLinks } from './data/navbarPublicLinks.js';
import { adminLinks } from './data/navbarAdminLinks.js';
import Navbar from './components/organisms/Navbar.jsx';
import { appRoutes } from './routes/config.js';

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
  const navbarTitle = isAdminRoute ? 'Admin Naves Front' : 'Naves Front';

  return (
    <>
      {showNavbar && <Navbar links={navbarLinks} title={navbarTitle} />}
      <main>
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
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;
