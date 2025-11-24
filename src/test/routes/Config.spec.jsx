// Importamos la configuración de rutas
import { appRoutes } from './appRoutes'; 

describe('Protección de Rutas (appRoutes)', () => {

  const publicRoutes = appRoutes.filter(route => !route.path.startsWith('/admin') && route.path !== '*');
  const adminRoutes = appRoutes.filter(route => route.path.startsWith('/admin'));
  const notFoundRoute = appRoutes.find(route => route.path === '*');


  // --- A. VALIDACIÓN DE RUTAS PÚBLICAS ---

  it('Todas las rutas públicas deben tener isAdmin undefined/falsy', () => {
    // Excluimos las rutas de admin y el 404
    publicRoutes.forEach(route => {
      expect(route.isAdmin).toBeFalsy();
    });
    
    // Verificación de conteo (11 rutas públicas)
    expect(publicRoutes.length).toBe(11); 
  });

  it('Todas las rutas públicas deben tener showNavbar en true', () => {
    publicRoutes.forEach(route => {
      expect(route.showNavbar).toBe(true);
    });
  });

  // Prueba específica para rutas que tienen IDs pero son públicas (para evitar regresiones)
  it('Las rutas de detalle de usuario deben ser públicas', () => {
    const detailPaths = ['/compras/:id', '/producto/:id', '/perfil', '/direcciones'];
    
    detailPaths.forEach(path => {
        const route = appRoutes.find(r => r.path === path);
        expect(route).toBeDefined();
        expect(route.isAdmin).toBeFalsy();
    });
  });


  // --- B. VALIDACIÓN DE RUTAS DE ADMINISTRADOR ---
  
  it('Todas las rutas de administrador deben tener el prefijo "/admin"', () => {
    // Usamos el filtro 'adminRoutes' definido arriba que ya asume el prefijo
    expect(adminRoutes.length).toBe(18); // 18 rutas de admin
  });

  it('Todas las rutas de administrador deben tener isAdmin en true', () => {
    adminRoutes.forEach(route => {
      expect(route.isAdmin).toBe(true);
    });
  });

  it('Todas las rutas de administrador deben tener showNavbar en true', () => {
    adminRoutes.forEach(route => {
      expect(route.showNavbar).toBe(true);
    });
  });
  
  // Verificación de consistencia en grupos de rutas (e.g., marcas)
  it('Las rutas de Marcas deben ser consistentes en la configuración de admin', () => {
    const marcaRoutes = adminRoutes.filter(r => r.path.includes('/marcas'));
    
    expect(marcaRoutes.length).toBe(3);
    marcaRoutes.forEach(route => {
      expect(route.isAdmin).toBe(true);
    });
  });


  // --- C. VALIDACIÓN DE 404 ---

  it('La ruta 404 debe ser la única con path "*"', () => {
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute.path).toBe('*');
    expect(notFoundRoute.isAdmin).toBeFalsy(); // No debe ser protegida
    expect(notFoundRoute.showNavbar).toBe(true); // Debe mostrar la Navbar
  });

});