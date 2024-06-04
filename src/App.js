import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import ProductDetail from './components/product-detail';
import ProductForm from './components/ProductForm';
import ProductList from './components/AdminProducts';
// import ProductDetails from './components/ProductDetails';
// import Cart from './components/Cart';
// import Orders from './components/Orders';
// import AddProduct from './components/AddProduct';
// import AdminProducts from './components/AdminProducts';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/admin/add-product" element={<ProductForm />} />
          <Route path="/admin/edit-product" element={<ProductForm />} />
          <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/editproduct" element={<ProductForm />} />
          {/* <Route path="/admin/products" element={<ProductList />} /> */}
          {/* <Route path="/products/:id" element={ProductDetails} />
          <Route path="/cart" element={Cart} />
          <Route path="/orders" element={Orders} />
          <Route path="/admin/add-product" element={AddProduct} />
          <Route path="/admin/products" element={AdminProducts} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
