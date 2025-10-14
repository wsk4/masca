import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; 
import Cart from '../../pages/Cart'; 

const mockProduct = {
  id: 1,
  name: 'Phantome',
  price: 120000,
  image: '/img/phantome_11zon.webp',
  quantity: 1,
};


const renderWithProviders = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <MemoryRouter>
      <CartContext.Provider {...providerProps}>{ui}</CartContext.Provider>
    </MemoryRouter>,
    renderOptions
  );
};

describe('Cart Component', () => {

  it('should render empty cart message when there are no products', () => {
    const providerProps = {
      value: {
        cart: [],
        total: 0,
        removeFromCart: () => {},
        clearCart: () => {},
      },
    };

    renderWithProviders(<Cart />, { providerProps });
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeTruthy();
  });

  it('should display products that are in the cart', () => {
    const providerProps = {
      value: {
        cart: [mockProduct],
        total: 120000,
        removeFromCart: () => {},
      },
    };

    renderWithProviders(<Cart />, { providerProps });

    expect(screen.getByText(mockProduct.name)).toBeTruthy();
    
    expect(screen.getAllByText(/\$120[.,]000/i).length).toBeGreaterThan(0);
  });

  it('should call removeFromCart when the delete button is clicked', () => {
    const removeFromCartMock = jasmine.createSpy('removeFromCart');

    const providerProps = {
      value: {
        cart: [mockProduct],
        total: 120000,
        removeFromCart: removeFromCartMock,
      },
    };

    renderWithProviders(<Cart />, { providerProps });

    const removeButton = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(removeButton);

    expect(removeFromCartMock).toHaveBeenCalledTimes(1);
    expect(removeFromCartMock).toHaveBeenCalledWith(mockProduct.id);
  });
});