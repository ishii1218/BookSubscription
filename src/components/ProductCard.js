import React from 'react';
import { Link,createSearchParams, useNavigate } from 'react-router-dom';
import './main.css';
import './products.css';
import axios from 'axios';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = (productId) => {
    axios.post('http://localhost:5000/cart', { productId })
      .then(response => {
        console.log('addedCart', response);
        console.log('Product added to cart:', response.data);
        navigate('/cart');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <div>
    <article className="card product-item">
      <header className="card__header">
        <h1 className="product__title">{product.title}</h1>
      </header>
      <div className="card__image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="card__content">
        <h2 className="product__price">${product.price}</h2>
        <p className="product__description">{product.description}</p>
      </div>
      <div className="card__actions">
      <Link
          to={{
          pathname: '/product-detail',
          search: createSearchParams({
          productId: product._id
          }).toString()
          }}
          className="btn">Details
      </Link>
      <button className="btn" onClick={() => addToCart(product._id)}>Add to Cart</button>
      {/* <form action="/cart" method="post">
        <button className="btn" type="submit">Add to Cart</button>
        <input type="hidden" name="productId" value={product._id} />
      </form> */}
      </div>
    </article>
    </div>
  );
}

export default ProductCard;
