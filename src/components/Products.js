import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
// import './products.css';
// import './main.css';
// import './forms.css';
// import Header from './Header';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        console.log('response', response);
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="products">
      {products.length > 0 ? (
        <div className="grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <h1>No Products Found!</h1>
      )}
    </div>
  );
}

export default Products;
