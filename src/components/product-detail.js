import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams,useNavigate } from 'react-router-dom';
import './main.css';
import './cart.css';


const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  console.log('productId', productId);
  const [product, setProduct] = useState(null);
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

  useEffect(() => {
    if (productId) {
      axios.get(`/products/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error(error));
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="centered">
      <h1>{product.title}</h1>
      <hr />
      <div className="image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <h2>${product.price}</h2>
      <p>{product.description}</p>
      <button className="btn" onClick={() => addToCart(product._id)}>Add to Cart</button>
      {/* <form action="/cart" method="post">
        <button className="btn" type="submit">Add to Cart</button>
        <input type="hidden" name="productId" value={product._id} />
      </form> */}
    </main>
  );
};

export default ProductDetail;
