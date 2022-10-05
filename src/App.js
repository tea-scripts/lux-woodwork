import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Footer,
  Navbar,
  Sidebar,
  SidebarCart,
  UserAddress,
  UserProfile,
  UserPurchases,
  UserReviews,
  UserTracking,
  UserWishlist,
  ScrollToTop,
  Registration,
  EmailVerificationModal,
  ForgotPasswordModal,
} from "./components";
import { calculateTotals } from "./features/cart/cartSlice";
import { fetchUsers } from "./features/users/userSlice";

import {
  Landing,
  Products,
  About,
  Error,
  Contact,
  SingleProduct,
  Cart,
  CheckoutPage,
  FAQ,
  EmailVerification,
  PasswordReset,
  PrivateRoute,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./pages/User";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(fetchUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Registration />
      <EmailVerificationModal />
      <ForgotPasswordModal />
      <SidebarCart />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/user/verify-email" element={<EmailVerification />} />
          <Route path="/user/reset-password" element={<PasswordReset />} />
          <Route path="user" element={<User />}>
            <Route index element={<UserProfile />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="purchases" element={<UserPurchases />} />
            <Route path="orders" element={<UserTracking />} />
            <Route path="wishlist" element={<UserWishlist />} />
            <Route path="reviews" element={<UserReviews />} />
          </Route>
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
      <Footer />
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
