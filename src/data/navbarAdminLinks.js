export const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/marcas", label: "Marcas" },
  { to: "/", label: "Salir", onClick: () => handleLogout() }, // opcional
];

export default adminLinks;