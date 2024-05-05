import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useAuth} from './context/useAuth';
// pages 
import Home from './pages/Home/Index';
import Shop from './pages/Home/Shop';
import Contact from './pages/Home/Contact';
import Cart from './pages/Home/Cart';
import NotFound from './pages/NotFound';

//admin pages
import AdminPage from './pages/admin/AdminPage';
import OrdersPage from './pages/admin/OrdersPage';
import ProductAdminPage from './pages/admin/ProductAdminPage';

// auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';
import ForbiddenPage from './pages/Auth/ForbiddenPage';

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function App() {
const { isAdmin } = useAuth();
  return (
    <div className=' font-poppins bg-gray-100'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* Protected routes */}
          <Route path="/admin/products"  element={ isAdmin ? <ProductAdminPage/>  :<ForbiddenPage  />  } />
          <Route path="/admin/orders" element={ isAdmin ? <OrdersPage/>  :<ForbiddenPage />  } />
          <Route path="/admin" element={ isAdmin ? <AdminPage/>  :<ForbiddenPage />  } />

          <Route path="/forbidden" element={<ForbiddenPage />} />
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
