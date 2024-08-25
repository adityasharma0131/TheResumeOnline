import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiBars3 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

import { Logo } from "../static/images/logos";
import { logout } from "../store/slices/authSlice";
import { resetResume } from "../store/slices/resumeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [navOpen, setNavOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Clear all storage
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Reset the Redux store
      dispatch(logout());
      dispatch(resetResume());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Open Navbar
  const handleToggleNavbar = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="inner">
          <Link to="/" className="logo">
            <img src={Logo} alt="TheResumes.online" />
          </Link>

          <button className="toggle" onClick={handleToggleNavbar}>
            {navOpen && <RxCross2 />}
            {!navOpen && <HiBars3 />}
          </button>

          <ul className={navOpen ? "show" : ""}>
            <li className="nav-item">
              <Link to="/templates" className="nav-link">
                Resume Templates
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/#faq" className="nav-link">
                FAQ
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/login" className="button-alt">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="button">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className="button-alt">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="button">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
