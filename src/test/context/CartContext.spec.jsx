import { renderHook, act } from '@testing-library/react';

import { CartProvider, useCart } from '../../context/CartContext';

const product1 = { id: 1, name: 'Perfume A', price: 100 };
const product2 = { id: 2, name: 'Perfume B', price: 200 };

describe('useCart Hook (CartContext)', () => {

  it('should have an empty cart and total of 0 initially', () => {

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });


    expect(result.current.cart.length).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('should add a new product to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });


    act(() => {
      result.current.addToCart(product1);
    });


    expect(result.current.cart.length).toBe(1);

    expect(result.current.cart[0]).toEqual({ ...product1, quantity: 1 });

    expect(result.current.total).toBe(100);
  });


  it('should increase quantity when adding an existing product', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });


    act(() => {
      result.current.addToCart(product1);
    });
    act(() => {
      result.current.addToCart(product1);
    });


    expect(result.current.cart.length).toBe(1);

    expect(result.current.cart[0].quantity).toBe(2);

    expect(result.current.total).toBe(200);
  });


  it('should remove a product from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });


    act(() => {
      result.current.addToCart(product1);
    });
    act(() => {
      result.current.addToCart(product2);
    });


    expect(result.current.total).toBe(300);


    act(() => {
      result.current.removeFromCart(product1.id);
    });


    expect(result.current.cart.length).toBe(1);

    expect(result.current.cart[0].id).toBe(product2.id);

    expect(result.current.total).toBe(200);
  });

  it('should clear the entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(product1);
    });
    act(() => {
      result.current.addToCart(product2);
    });

    expect(result.current.cart.length).toBe(2);


    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart.length).toBe(0);
    expect(result.current.total).toBe(0);
  });
});