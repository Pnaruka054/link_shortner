import { Link } from "react-router-dom";
import "./nav_bar.css";
import { useEffect, useState } from "react";

const Nav_Bar = () => {
  const jwtToken_state = localStorage.getItem('jwtToken_state');
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    if (jwtToken_state) {
      setDashboard(true)
    }
  }, []);
  return (
    <div className="relative">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/Logo.png" alt="CashShrink Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/payout_rates">
                  Payout Rates
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq" rel="noopener noreferrer">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contactUs"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item me-4">
                <span className="navbar-divider"></span>
              </li>

              <li className="nav-item">
                {dashboard ? (<div className="btn-group" role="group">
                  <Link className="btn btn-outline-light" to="/member/dashboard"> Dashboard </Link>
                </div>) : (<div className="btn-group" role="group">
                  <Link className="btn btn-outline-light" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-outline-light" to="/signup">
                    Sign Up
                  </Link>
                </div>)}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav_Bar;
