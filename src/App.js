import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Registration, Sidebar } from "./components";
import Cart from "./components/Cart";
import { Contact, Landing, Products } from "./pages";

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
        <Route path="contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
