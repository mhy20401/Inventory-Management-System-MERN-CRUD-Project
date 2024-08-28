import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css'; // Import the custom CSS file

const Navbar = (props) => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => setShowLogin(!showLogin);

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Existing Navigation Links */}
              <li className="nav-item">
                <NavLink className="nav-link active custom-nav-link" aria-current="page" to="/">
                  {props.title}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active custom-nav-link" aria-current="page" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active custom-nav-link" aria-current="page" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active custom-nav-link" aria-current="page" to="/cart">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active custom-nav-link" aria-current="page" to="/revenue">
                  Revenue
                </NavLink>
              </li>
            </ul>

            {/* Login Toggle */}
            <div className="nav__actions">
              <div className="nav__login" onClick={toggleLogin}>
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Overlay */}
      {showLogin && (
        <div className="login show-login">
          <div className="login__close" onClick={toggleLogin}>
            <i className="fa-solid fa-times"></i>
          </div>
          <form className="login__form">
            <h2 className="login__title">Login</h2>
            <div className="login__group">
              <label className="login__label" htmlFor="username">
                Username
              </label>
              <input type="text" className="login__input" id="username" placeholder="Enter username" />
            </div>
            <div className="login__group">
              <label className="login__label" htmlFor="password">
                Password
              </label>
              <input type="password" className="login__input" id="password" placeholder="Enter password" />
            </div>
            <button type="submit" className="login__button">Sign In</button>
            <div className="login__forgot">Forgot Password?</div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
