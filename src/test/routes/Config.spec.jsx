// Importamos la configuración de rutas
import { appRoutes } from './appRoutes'; 

describe('Protección de Rutas (appRoutes)', () => {

  const publicRoutes = appRoutes.filter(route => !route.path.startsWith('/admin') && route.path !== '*');
  const adminRoutes = appRoutes.filter(route => route.path.startsWith('/admin'));
  const notFoundRoute = appRoutes.find(route => route.path === '*');




  it('Todas las rutas públicas deben tener isAdmin undefined/falsy', () => {

    publicRoutes.forEach(route => {
      expect(route.isAdmin).toBeFalsy();
    });
    

    expect(publicRoutes.length).toBe(11); 
  });

  it('Todas las rutas públicas deben tener showNavbar en true', () => {
    publicRoutes.forEach(route => {
      expect(route.showNavbar).toBe(true);
    });
  });

  it('Las rutas de detalle de usuario deben ser públicas', () => {
    const detailPaths = ['/compras/:id', '/producto/:id', '/perfil', '/direcciones'];
    
    detailPaths.forEach(path => {
        const route = appRoutes.find(r => r.path === path);
        expect(route).toBeDefined();
        expect(route.isAdmin).toBeFalsy();
    });
  });



  
  it('Todas las rutas de administrador deben tener el prefijo "/admin"', () => {

    expect(adminRoutes.length).toBe(18); 
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
  

  it('Las rutas de Marcas deben ser consistentes en la configuración de admin', () => {
    const marcaRoutes = adminRoutes.filter(r => r.path.includes('/marcas'));
    
    expect(marcaRoutes.length).toBe(3);
    marcaRoutes.forEach(route => {
      expect(route.isAdmin).toBe(true);
    });
  });




  it('La ruta 404 debe ser la única con path "*"', () => {
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute.path).toBe('*');
    expect(notFoundRoute.isAdmin).toBeFalsy(); 
    expect(notFoundRoute.showNavbar).toBe(true); 
  });

});