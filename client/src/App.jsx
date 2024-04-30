import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages 
import Home from './pages/Home/Index';
import Shop from './pages/Home/Shop';
import Contact from './pages/Home/Contact';
import Cart from './pages/Home/Cart';
import NotFound from './pages/NotFound';


//admin pages
import OrdersPage from './pages/admin/OrdersPage';
import ProductAdminPage from './pages/admin/ProductAdminPage';

// auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';



// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';


export default function App() {
  return (
    <div className=' font-poppins bg-gray-100'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<ProductAdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
