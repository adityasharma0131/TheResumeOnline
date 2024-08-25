import { Outlet } from "react-router-dom";
import { Footer, Header, Breadcrumb } from "../components";
import { Sidebar } from "../pages/dashboard";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <div className="db-section">
        <div className="container">
          <div className="grid grid-cols-5 gap-7">
            <Sidebar />
            <div className="col-span-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
