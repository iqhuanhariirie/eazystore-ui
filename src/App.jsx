import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import AddProduct from './pages/AddProduct'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
