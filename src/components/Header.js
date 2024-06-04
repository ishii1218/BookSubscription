import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import './Header.css';
import './main.css';


function Header() {
  useEffect(() => {
    const backdrop = document.querySelector('.backdrop');
    const sideDrawer = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('#side-menu-toggle');

    function backdropClickHandler() {
      backdrop.style.display = 'none';
      sideDrawer.classList.remove('open');
    }

    function menuToggleClickHandler() {
      backdrop.style.display = 'block';
      sideDrawer.classList.add('open');
    }

    backdrop.addEventListener('click', backdropClickHandler);
    menuToggle.addEventListener('click', menuToggleClickHandler);

    // Clean up event listeners on component unmount
    return () => {
      backdrop.removeEventListener('click', backdropClickHandler);
      menuToggle.removeEventListener('click', menuToggleClickHandler);
    };
  }, []);

  return (
    <div>

    <div className="backdrop"></div>
    <header className="main-header">
      <button id="side-menu-toggle">Menu</button>
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <NavLink to="/" activeclassname="active">Shop</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/products" activeclassname="active">Products</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/cart" activeclassname="active">Cart</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/orders" activeclassname="active">Orders</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/admin/add-product" activeclassname="active">Add Product</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/admin/products" activeclassname="active">Admin Products</NavLink>
          </li>
        </ul>
      </nav>
    </header>


      <nav className="mobile-nav">
      <ul className="mobile-nav__item-list">
        <li className="mobile-nav__item">
        <NavLink to="/" activeclassname="active">Shop</NavLink>
        </li>
        <li className="mobile-nav__item">
        <NavLink to="/products" activeclassname="active">Products</NavLink>
        </li>
        <li className="mobile-nav__item">
        <NavLink to="/cart" activeclassname="active">Cart</NavLink>
        </li>
        <li className="mobile-nav__item">
        <NavLink to="/orders" activeclassname="active">Orders</NavLink>
        </li>
        <li className="mobile-nav__item">
        <NavLink to="/admin/add-product" activeclassname="active">Add Product</NavLink>
        </li>
        <li className="mobile-nav__item">
        <NavLink to="/admin/products" activeclassname="active">Admin Products</NavLink>
        </li>
      </ul>
    </nav>
    </div>
    
    
  );
}

export default Header;
