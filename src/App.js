import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  UserAddress,
  UserProfile,
  UserReviews,
  UserOrders,
  UserWishlist,
  ScrollToTop,
  UpdatePassword,
  AdminDashboard,
  AdminAddUsers,
  AdminViewUsers,
  AdminViewOrders,
  AdminAddProducts,
  AdminViewProducts,
  AdminViewReviews,
  AdminProfile,
  AdminSupportTickets,
  StripeCheckout,
  AdminArchivedOrders,
  AdminArchivedProducts,
  AdminArchivedReviews,
  AdminInventory,
  AdminShipment,
  AdminViewOrder,
  AdminSupportContact,
  UserSupportTickets,
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
  ReviewProduct,
  UnsubscribeNewsLetter,
} from "./pages";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./pages/User";
import SharedLayout from "./pages/SharedLayout";
import { fetchAllProducts } from "./features/products/productsSlice";
import { fetchAllUserAddresses } from "./features/address/addressSlice";
import { fetchAllOrders } from "./features/orders/orderSlice";
import { fetchReviews } from "./features/reviews/reviewsSlice";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);
  const { defaultAddress } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, defaultAddress]);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(fetchUsers());
      dispatch(fetchAllOrders());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchReviews());
    if (user && user.isVerified) {
      dispatch(fetchAllUserAddresses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
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
            <Route
              path="/newsletter/unsubscribe"
              element={<UnsubscribeNewsLetter />}
            />
            <Route path="/user/reset-password" element={<PasswordReset />} />
            <Route
              path="/review-product/:reviewId/:productId"
              element={<ReviewProduct />}
            />
            <Route
              path="/review-product/:productId"
              element={<ReviewProduct />}
            />
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
              <Route path="support" element={<UserSupportTickets />} />
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
            <Route path="orders-view" element={<AdminViewOrders />} />
            <Route path="orders-search" element={<AdminViewOrder />} />
            <Route path="products-add" element={<AdminAddProducts />} />
            <Route path="products-view" element={<AdminViewProducts />} />
            <Route path="reviews/view" element={<AdminViewReviews />} />
            <Route
              path="archives/products"
              element={<AdminArchivedProducts />}
            />
            <Route path="archives/orders" element={<AdminArchivedOrders />} />
            <Route path="archives/reviews" element={<AdminArchivedReviews />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="shipment" element={<AdminShipment />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="support/tickets" element={<AdminSupportTickets />} />
            <Route
              path="support/contact-us"
              element={<AdminSupportContact />}
            />
          </Route>
        </Routes>
      </ScrollToTop>
      <ToastContainer
        position="top-center"
        transition={Flip}
        pauseOnFocusLoss={false}
      />
    </BrowserRouter>
  );
}

export default App;
