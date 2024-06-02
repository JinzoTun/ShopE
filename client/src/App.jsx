import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import {useAuth} from './context/useAuth';
import Loader from './components/Loader';
// pages 
import Home from './pages/Home/Index';
import Shop from './pages/Home/Shop';
import Contact from './pages/Home/Contact';
import Cart from './pages/Home/Cart';
import NotFound from './pages/Home/NotFound';


//admin pages
import AdminPage from './pages/admin/AdminPage';
import OrdersPage from './pages/admin/OrdersPage';
import ProductAdminPage from './pages/admin/ProductAdminPage';
import Users from './pages/admin/Users';

// auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';
import ForbiddenPage from './pages/Auth/ForbiddenPage';

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';

export default function App() {
const { isAdmin , isLoading} = useAuth();
  return (
    <div className=' font-mono bg-gray-100'>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<><NavBar /><Home /></>} />
          <Route path="/shop" element={<><NavBar /><Shop /></>} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          <Route path="/contact" element={<><NavBar /><Contact /></>} />
          <Route path="/cart" element={<><NavBar /><Cart /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<><NavBar /><Profile /></>} />
          {/* Protected routes */}
          <Route path="/admin/products"  element={ isAdmin ? <><NavBar /><ProductAdminPage /></>  :<ForbiddenPage  />  } />
          <Route path="/admin/orders" element={ isAdmin ? <><NavBar /><OrdersPage /></>  :<ForbiddenPage />  } />
          <Route path="/admin" element=  {isLoading ? 
          <Loader />:
          
          isAdmin ? 
          <><NavBar /><AdminPage /></>: 
            <ForbiddenPage />
        } />
          <Route path="/admin/users" element={ isAdmin ? <><NavBar /><Users /></>  :<ForbiddenPage />  } />
          {/* 403 route */} 
          <Route path="/forbidden" element={<ForbiddenPage />} />
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
