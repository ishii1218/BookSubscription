import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';
import './cart.css';
import './forms.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then(response => setOrders(response.data.orders))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <main>
      {orders.length <= 0 ? (
        <h1>Nothing there!</h1>
      ) : (
        <ul className="orders">
          {orders.map(order => (
            <li className="orders__item" key={order._id}>
              <h1>Order - # {order._id}</h1>
              <ul className="orders__products">
                {order.products.map(p => (
                  <li className="orders__products-item" key={p.product._id}>
                    {p.product.title} ({p.quantity})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Orders;
