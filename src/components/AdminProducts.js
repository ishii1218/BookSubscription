// ProductList.js
import React, { useEffect, useState } from 'react';
import { Link,createSearchParams } from 'react-router-dom';
import axios from 'axios';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/products')
      .then(response => {
        console.log('response', response);
        setProducts(response.data.prods);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleDelete = (productId) => {
    axios.post('http://localhost:5000/admin/delete-product', { productId })
      .then(() => {
        setProducts(products.filter(product => product._id !== productId));
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  return (
    <main>
      {products.length > 0 ? (
        <div className="grid">
          {products.map(product => (
            <article key={product._id} className="card product-item">
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
                pathname: '/admin/editproduct',
                search: createSearchParams({
                productId: product._id,
                Editing: true
                }).toString()
                }}
                className="btn">Edit
                </Link>
                {/* <Link to={`/admin/editproduct/${product._id}`} className="btn">Edit</Link> */}
                <button className="btn" onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h1>No Products Found!</h1>
      )}
    </main>
  );
};

export default ProductList;
