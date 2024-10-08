import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import toast

export default function Navbar({ title, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the backend logout route
      await axios.post('http://localhost:3001/logout');

      // Remove the auth token from localStorage
      localStorage.removeItem('authToken');
      
      // Update login state
      setIsLoggedIn(false);

      // Show success toast
      toast.success("Logged out successfully!");

      // Navigate to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Show error toast
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-danger">
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
            <li className="nav-item">
              <Link className="nav-link active text-white fs-4" to="/">
                {title}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white fs-4" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white fs-4" to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Conditionally render buttons based on login status */}
          {isLoggedIn ? (
            <button className="btn btn-primary fs-5" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="d-flex">
              <Link to="/login">
                <button className="btn btn-primary fs-5 me-2">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary fs-5">Signup</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
