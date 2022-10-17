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
  UserReviews,
  UserOrders,
  UserWishlist,
  ScrollToTop,
  Registration,
  EmailVerificationModal,
  ForgotPasswordModal,
  UpdatePassword,
  AdminDashboard,
  AdminAddUsers,
  AdminViewUsers,
  AdminAddOrders,
  AdminViewOrders,
  AdminAddProducts,
  AdminViewProducts,
  AdminViewReviews,
  AdminProfile,
  AdminSupport,
  StripeCheckout,
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
  Admin,
  SingleOrder,
} from "./pages";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./pages/User";
import SharedLayout from "./pages/SharedLayout";
import { fetchAllProducts } from "./features/products/productsSlice";
import { fetchAllUserAddresses } from "./features/address/addressSlice";
import { fetchAllOrders } from "./features/orders/orderSlice";

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
      dispatch(fetchAllOrders());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllProducts());
    if (user) {
      dispatch(fetchAllUserAddresses());
    }
  }, []);

  return (
    <BrowserRouter>
      {/* <Navbar />
      <Sidebar />
      <Registration />
      <EmailVerificationModal />
      <ForgotPasswordModal />
      <SidebarCart /> */}
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index path="/" element={<Landing />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<SingleProduct />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/user/verify-email" element={<EmailVerification />} />
            <Route path="/user/reset-password" element={<PasswordReset />} />
            <Route
              path="user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            >
              <Route index element={<UserProfile />} />
              <Route path="address" element={<UserAddress />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="orders/:id" element={<SingleOrder />} />
              <Route path="wishlist" element={<UserWishlist />} />
              <Route path="reviews" element={<UserReviews />} />
              <Route path="update-password" element={<UpdatePassword />} />
            </Route>

            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-order/:id"
              element={
                <PrivateRoute>
                  <StripeCheckout />
                </PrivateRoute>
              }
            />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            {/* <Route path="/stripecheckout/:id" element={<StripeCheckout />} /> */}
            <Route path="*" element={<Error />} />
          </Route>
          <Route
            path="admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route index element={<AdminViewProducts />} />
            <Route path="users-add" element={<AdminAddUsers />} />
            <Route path="users-view" element={<AdminViewUsers />} />
            <Route path="orders/view" element={<AdminViewOrders />} />
            <Route path="products-add" element={<AdminAddProducts />} />
            <Route path="products-view" element={<AdminViewProducts />} />
            <Route path="reviews/view" element={<AdminViewReviews />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>
        </Routes>
      </ScrollToTop>
      <ToastContainer position="top-center" transition={Flip} />
    </BrowserRouter>
  );
}

export default App;
