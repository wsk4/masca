import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import NavBar from '../../../components/organisms/Navbar'; 

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

describe('NavBar Component', () => {

  it('should render all navigation links after toggling', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );


    const toggleButton = screen.getByLabelText(/toggle navigation/i);
    

    fireEvent.click(toggleButton);


    expect(screen.getByText('Mascapitos Store')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Home' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Productos' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeTruthy();
  });


  it('should navigate to the correct page on link click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
        <LocationDisplay />
      </MemoryRouter>
    );


    expect(screen.getByTestId('location-display').textContent).toBe('/');


    const toggleButton = screen.getByLabelText(/toggle navigation/i);
    fireEvent.click(toggleButton);


    const productsLink = screen.getByRole('link', { name: 'Productos' });
    fireEvent.click(productsLink);

    expect(screen.getByTestId('location-display').textContent).toBe('/products');
  });
});