import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <header className="header">
        <nav className="navbar">
          <div className="navbar-brand">E-Village Portal</div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/features" className="nav-link">
                Features
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button onClick={toggleDropdown} className="nav-link login-btn">
                Login ▾
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/login/admin" className="dropdown-item">
                      Admin Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/login/employee" className="dropdown-item">
                      Employee Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/login/healthcare" className="dropdown-item">
                      Healthcare Worker Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/login/ration" className="dropdown-item">
                      Ration Officer Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/login/family" className="dropdown-item">
                      Family Member Login
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-content">
          <h1>Welcome to the e-Village Portal</h1>
          <p>
            Manage your village data, healthcare services, ration distribution,
            and family information effortlessly.
          </p>
          <Link to="/login" className="btn">
            Login Now
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <h2>Admin Dashboard</h2>
          <p>
            Oversee village data, manage user accounts, send notifications, and generate insightful analytics.
          </p>
        </div>
        <div className="feature">
          <h2>Healthcare Services</h2>
          <p>
            Keep track of family health records, schedule checkups, and provide timely medical assistance.
          </p>
        </div>
        <div className="feature">
          <h2>Family Portal</h2>
          <p>
            View and update your family's data, apply for job opportunities, and receive important notifications.
          </p>
        </div>
        <div className="feature">
          <h2>Ration Management</h2>
          <p>
            Stay informed about ration policies, avail entitlements, and monitor ration card statuses.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} e-Village Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
