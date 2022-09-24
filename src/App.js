import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Registration, Sidebar } from './components';
import Cart from './components/Cart';
import {
  Landing,
  Products,
  About,
  Error,
  Contact,
  SingleProduct,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Registration />
      <Cart />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<SingleProduct />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
