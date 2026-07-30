import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './components/Home.tsx';
import AddProduct from './pages/AddProduct.tsx';
import EditProduct from './pages/EditProduct.tsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
