import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './main.css';
import './cart.css';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then(response => setProducts(response.data.products))
      .catch(error => console.error('Error fetching cart products:', error));
  }, []);

  const handleDelete = (productId) => {
    axios.post('http://localhost:5000/cart-delete-item', { productId })
      .then(() => setProducts(products.filter(p => p.productId._id !== productId)))
      .catch(error => console.error('Error deleting product from cart:', error));
  };

  const handleOrder = () => {
    axios.post('http://localhost:5000/create-order')
      .then(() => navigate('/orders'))
      .catch(error => console.error('Error creating order:', error));
  };

  return (
    <main>
      {products.length > 0 ? (
        <ul className="cart__item-list">
          {products.map(p => (
            <li className="cart__item" key={p.productId._id}>
              <h1>{p.productId.title}</h1>
              <h2>Quantity: {p.quantity}</h2>
              <button className="btn danger" onClick={() => handleDelete(p.productId._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <h1>No Products in Cart!</h1>
      )}
      {products.length > 0 && (
        <>
          <hr />
          <div className="centered">
            <button className="btn" onClick={handleOrder}>Order Now!</button>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
