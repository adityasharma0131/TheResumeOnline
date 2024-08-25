import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

import { LogoAlt } from "../static/images/logos";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-5 gap-4">
          <div className="info">
            <Link to="/" className="logo">
              <img src={LogoAlt} alt="" />
            </Link>
            <div className="social">
              <Link
                to="https://www.facebook.com/theresumes.online"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="https://www.instagram.com/theresumes.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram />
              </Link>
              <Link
                to="https://www.linkedin.com/showcase/theresumes/about/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                to="https://x.com/the_resumes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX />
              </Link>
            </div>
          </div>

          <div className="item">
            <h6>Job Seekers</h6>
            <ul>
              <li>
                <Link to={isAuthenticated ? "/templates" : "/login"}>
                  Create a resume
                </Link>
              </li>
              <li>
                <Link to="/templates">Resume templates</Link>
              </li>
              <li>
                <Link to="/">Cover Letter templates</Link>
              </li>
              <li>
                <Link to="/">Job search</Link>
              </li>
            </ul>
          </div>

          <div className="item">
            <h6>Career resources</h6>
            <ul>
              <li>
                <Link to="/">Resume Help</Link>
              </li>
              <li>
                <Link to="/">Job interview</Link>
              </li>
              <li>
                <Link to="/">Cover letter</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          <div className="item">
            <h6>Our Company</h6>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>

          <div className="item">
            <h6>Support</h6>
            <ul>
              <li>
                <Link to="/#faq">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/payment-policy">Payment Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
