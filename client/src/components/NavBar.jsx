import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm " role="navigation">
      <Link to="/" className="pl-8">shopE</Link>
      <div className="px-4 cursor-pointer md:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        
      </div>
      <div className="pr-8 md:block hidden">
        <Link to="/" className="p-4">Home</Link>
        <Link to="/shop" className="p-4">Shop</Link>
        <Link to="/contact" className="p-4">Contact</Link>
        <Link to="/cart" className="p-4">Cart</Link>
      </div>
    </nav>
  )
}

export default NavBar
