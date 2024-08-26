import React from 'react'
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom


export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active text-white fs-4" aria-current="page" to="/">{props.title}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-white fs-4" aria-current="page" to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-white fs-4" aria-current="page" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-white fs-4" aria-current="page" to="/cart">Cart</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-white fs-4" aria-current="page" to="/revenue">Revenue</NavLink></li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-primary fs-5" type="submit">Search</button>
            </form>
          </div>
        </div>

      </nav>
    </div>
  )
}
