import '@testing-library/jest-dom'; // Importa los matchers personalizados
import 'bootstrap/dist/css/bootstrap.min.css';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Limpieza automática tras cada test para evitar colisiones
afterEach(() => {
  cleanup();
});