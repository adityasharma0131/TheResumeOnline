import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const titleMapping = {
    "/": "Home",
    "/about": "About",
    "/faq": "FAQ",
    "/contact": "Contact Us",
    "/terms-of-services": "Terms of Services",
    "/templates": "Templates",
    "/pricing": "Pricing",
    "/privacy-policy": "Privacy Policy",
    "/payment-policy": "Payment Policy",
    "/dashboard": "Dashboard",
    "/dashboard/profile": "Profile",
    "/dashboard/resumes": "Resumes",
    "/login": "Login",
    "/register": "Register",
    "/forgot-password": "Forgot Password",
    "/blog": "Blog",
    "/unsubscribe": "Unsubscribe",
  };

  const pageTitle = titleMapping[`/${pathnames.join("/")}`] || "Page";

  return (
    <div className="breadcrumb">
      <div className="container">
        <div className="inner">
          <h1 className="breadcrumb-title">{pageTitle}</h1>
          <ul className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/">
                <GoHome />
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <li key={to} className="breadcrumb-item">
                  <Link to={to}>{value}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
