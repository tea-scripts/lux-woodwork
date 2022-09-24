import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Registration, Sidebar } from './components';
import Cart from './components/Cart';
import { Landing, Products, About, Error, Contact } from './pages';

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
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
