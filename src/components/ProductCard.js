import React from 'react';
import { Link,createSearchParams   } from 'react-router-dom';
import './main.css';
import './products.css';

function ProductCard({ product }) {

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
      <form action="/cart" method="post">
        <button className="btn" type="submit">Add to Cart</button>
        <input type="hidden" name="productId" value={product._id} />
      </form>
      </div>
    </article>
    </div>
  );
}

export default ProductCard;
