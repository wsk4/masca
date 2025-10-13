import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useCart } from '../context/CartContext.jsx';
import Button from '../components/atoms/Button.jsx';
import Text from '../components/atoms/Text.jsx';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { cart, removeFromCart, clearCart, total } = useCart();
    const navigate = useNavigate();

    return (
        <Container className="my-5">
        <Text variant="h2" className="mb-4">🛒 Carrito de Compras</Text>

        {cart.length === 0 ? (
            <>
            <Text variant="p">Tu carrito está vacío.</Text>
            <Button variant="primary" onClick={() => navigate('/products')}>
                Ir a comprar
            </Button>
            </>
        ) : (
            <>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item) => (
                    <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                    <td>{item.quantity}</td>
                    <td>
                        {(item.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                    </td>
                    <td>
                        <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        >
                        Eliminar
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Text variant="h4" className="mt-4">
                Total: {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
            </Text>

            <div className="mt-3 d-flex gap-3">
                <Button variant="warning" onClick={clearCart}>Vaciar carrito</Button>
                <Button variant="success" onClick={() => alert('Procediendo al pago...')}>Pagar</Button>
            </div>
            </>
        )}
        </Container>
    );
}

export default Cart;
