import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { Landing } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
