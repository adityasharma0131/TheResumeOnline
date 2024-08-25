import { Outlet } from "react-router-dom";

import { Footer, Header } from "../components";

const AuthenticationLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthenticationLayout;
