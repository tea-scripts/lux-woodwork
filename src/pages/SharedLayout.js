import React from "react";
import { Outlet } from "react-router-dom";
import {
  EmailVerificationModal,
  Footer,
  ForgotPasswordModal,
  Navbar,
  Registration,
  Sidebar,
  SidebarCart,
} from "../components";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Registration />
      <EmailVerificationModal />
      <ForgotPasswordModal />
      <SidebarCart />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
