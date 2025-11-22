import { lazy } from 'react';

// Lazy loading para páginas del usuario
const Home = lazy(() => import('../pages/user/Home.jsx'));
const Contacto = lazy(() => import('../pages/user/Contacto.jsx'));
const CatalogoPerfumes = lazy(() => import('../pages/user/CatalogoPerfumes.jsx'));
const Cart = lazy(() => import('../pages/user/Cart.jsx'));
const Orders = lazy(() => import('../pages/user/Orders.jsx'));
const OrderDetail = lazy(() => import('../pages/user/OrderDetail.jsx'));
const ProductDetail = lazy(() => import('../pages/user/ProductDetail.jsx'));
const Profile = lazy(() => import('../pages/user/Profile.jsx'));
const AddressBook = lazy(() => import('../../src/pages/user/AdderssBook.jsx'));
const Login = lazy(() => import('../pages/auth/login.jsx'));
const CreateUser = lazy(() => import('../pages/auth/create-user.jsx'));

// Lazy loading para páginas de admin (rutas corregidas con "admin" en minúscula)
const HomeAdmin = lazy(() => import('../pages/Admin/HomeAdmin.jsx'));
const ListarUsuarios = lazy(() => import('../pages/Admin/usuarios/ListarUsuarios.jsx'));
const CrearEditarUsuario = lazy(() => import('../pages/Admin/usuarios/CrearEditarUsuario.jsx'));
const ListarPerfumes = lazy(() => import('../pages/Admin/perfumes/ListarPerfumes.jsx'));
const CrearEditarPerfume = lazy(() => import('../pages/Admin/perfumes/CrearEditarPerfume.jsx'));
const ListarMarcas = lazy(() => import('../pages/Admin/marcas/ListarMarcas.jsx'));
const CrearEditarMarca = lazy(() => import('../pages/Admin/marcas/CrearEditarMarca.jsx'));
const ListarCategorias = lazy(() => import('../pages/Admin/categorias/ListarCategorias.jsx'));
const CrearEditarCategoria = lazy(() => import('../pages/Admin/categorias/CrearEditarCategoria.jsx'));
const ListarUbicaciones = lazy(() => import('../pages/Admin/ubicaciones/ListarUbicaciones.jsx'));
const CrearEditarUbicacion = lazy(() => import('../pages/Admin/ubicaciones/CrearEditarUbicacion.jsx'));
const ListarCompras = lazy(() => import('../pages/Admin/compras/ListarCompras.jsx'));
const DetalleCompra = lazy(() => import('../pages/Admin/compras/DetalleCompra.jsx'));
const ListarEstados = lazy(() => import('../pages/Admin/estados/ListarEstados.jsx'));
const CrearEditarEstado = lazy(() => import('../pages/Admin/estados/CrearEditarEstado.jsx'));


// Rutas públicas (usuario final)
const publicRoutes = [
  { path: '/', element: <Home />, showNavbar: true },
  { path: '/contacto', element: <Contacto />, showNavbar: true },
  { path: '/catalogo', element: <CatalogoPerfumes />, showNavbar: true },
  { path: '/carrito', element: <Cart />, showNavbar: true },
  { path: '/compras', element: <Orders />, showNavbar: true },
  { path: '/compras/:id', element: <OrderDetail />, showNavbar: true },
  { path: '/producto/:id', element: <ProductDetail />, showNavbar: true },
  { path: '/perfil', element: <Profile />, showNavbar: true },
  { path: '/direcciones', element: <AddressBook />, showNavbar: true },
  { path: '/login', element: <Login />, showNavbar: false },
  { path: '/registro', element: <CreateUser />, showNavbar: false },
];

// Rutas de administración
const adminRoutes = [
  { path: '/admin', element: <HomeAdmin />, isAdmin: true, showNavbar: true },
  { path: '/admin/usuarios', element: <ListarUsuarios />, isAdmin: true, showNavbar: true },
  { path: '/admin/usuarios/crear', element: <CrearEditarUsuario />, isAdmin: true, showNavbar: true },
  { path: '/admin/usuarios/:id', element: <CrearEditarUsuario />, isAdmin: true, showNavbar: true },

  { path: '/admin/perfumes', element: <ListarPerfumes />, isAdmin: true, showNavbar: true },
  { path: '/admin/perfumes/crear', element: <CrearEditarPerfume />, isAdmin: true, showNavbar: true },
  { path: '/admin/perfumes/:id', element: <CrearEditarPerfume />, isAdmin: true, showNavbar: true },

  { path: '/admin/marcas', element: <ListarMarcas />, isAdmin: true, showNavbar: true },
  { path: '/admin/marcas/crear', element: <CrearEditarMarca />, isAdmin: true, showNavbar: true },
  { path: '/admin/marcas/:id', element: <CrearEditarMarca />, isAdmin: true, showNavbar: true },

  { path: '/admin/categorias', element: <ListarCategorias />, isAdmin: true, showNavbar: true },
  { path: '/admin/categorias/crear', element: <CrearEditarCategoria />, isAdmin: true, showNavbar: true },
  { path: '/admin/categorias/:id', element: <CrearEditarCategoria />, isAdmin: true, showNavbar: true },

  { path: '/admin/ubicaciones', element: <ListarUbicaciones />, isAdmin: true, showNavbar: true },
  { path: '/admin/ubicaciones/crear', element: <CrearEditarUbicacion />, isAdmin: true, showNavbar: true },
  { path: '/admin/ubicaciones/:id', element: <CrearEditarUbicacion />, isAdmin: true, showNavbar: true },

  { path: '/admin/compras', element: <ListarCompras />, isAdmin: true, showNavbar: true },
  { path: '/admin/compras/:id', element: <DetalleCompra />, isAdmin: true, showNavbar: true },

  { path: '/admin/estados', element: <ListarEstados />, isAdmin: true, showNavbar: true },
  { path: '/admin/estados/crear', element: <CrearEditarEstado />, isAdmin: true, showNavbar: true },
  { path: '/admin/estados/:id', element: <CrearEditarEstado />, isAdmin: true, showNavbar: true },
];

// Ruta 404
const notFoundRoute = {
  path: '*',
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

// Exporta todas juntas
export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];
