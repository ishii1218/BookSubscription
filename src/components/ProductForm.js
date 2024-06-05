// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './main.css';
import './forms.css';

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    imageUrl: '',
    price: '',
    description: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (productId) {
      setEditing(true);
      axios.get(`http://localhost:5000/admin/edit-product/${productId}?edit=true`)
        .then(response => {
          setProduct(response.data.product);
        })
        .catch(error => {
          console.error('There was an error fetching the product!', error);
        });
    }
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    //console.log(product);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      axios.post(`http://localhost:5000/admin/edit-product`, { ...product, productId })
        .then(() => {
          navigate('/admin/products');
        })
        .catch(error => {
          console.error('There was an error updating the product!', error);
        });
    } else {
      axios.post('http://localhost:5000/admin/add-product', product)
        .then(() => {
          navigate('/admin/products');
        })
        .catch(error => {
          console.error('There was an error adding the product!', error);
        });
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={product.title} onChange={handleChange} />
      </div>
      <div className="form-control">
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" value={product.imageUrl} onChange={handleChange} />
      </div>
      <div className="form-control">
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" step="0.01" value={product.price} onChange={handleChange} />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" rows="5" value={product.description} onChange={handleChange}></textarea>
      </div>
      <button className="btn" type="submit">{editing ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;
