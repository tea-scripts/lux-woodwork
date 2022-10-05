import React from "react";
import { Outlet } from "react-router-dom";
import {
  EmailVerificationModal,
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
    </>
  );
};

export default SharedLayout;
