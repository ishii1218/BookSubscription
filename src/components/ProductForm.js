import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './main.css';
import './forms.css';

const ProductForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get('productId');
  const editing = searchParams.get('Editing');
  console.log('editing', editing);
  console.log('productId', productId);
  //const [editing, setEditing] = useState(!!productId);

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:5000/admin/edit-product/${productId}`)
        .then(response => {
          
          setFormData(response.data);
          //console.log('responseEditform', formData);
        })
        .catch(error => console.error(error));
    }
  }, [editing, productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('formData', formData);
    const url = editing ? `http://localhost:5000/admin/edit-product` : `http://localhost:5000/admin/add-product`;
    axios.post(url, {
        formData,
        productId: editing ? productId : undefined // Ensure productId is only sent when editing
      })
      .then(response => {
        console.log('response', response);
        editing ? navigate('/admin/products'):navigate('/products');
      })
      .catch(error => console.error(error));
  };

  return (
    <main>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="btn" type="submit">
          {editing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </main>
  );
};

export default ProductForm;
