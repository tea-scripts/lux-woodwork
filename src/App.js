import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Footer,
  Navbar,
  Sidebar,
  SidebarCart,
  ScrollToTop,
} from './components';
import { calculateTotals } from './features/cart/cartSlice';

import {
  Landing,
  Products,
  About,
  Error,
  Contact,
  SingleProduct,
  Cart,
  CheckoutPage,
  PrivateRoute,
  FAQ,
} from './pages';

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
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
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
