import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/useCart";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const DropdownMenu = ({ countItems, onClose }) => {
  const { isLoggedIn } = useAuth(); // Get the isLoggedIn state from the useAuth hook

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose(); // Close the menu if click is outside
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={dropdownRef} className="absolute top-full right-2 mt-2">
      <div className="bg-white border rounded-md shadow-lg overflow-hidden">
        <ul className="py-1">
          <li className="transition duration-300 ease-in-out hover:bg-gray-100">
            <Link to="/" className="block px-4 py-2" onClick={onClose}>Home</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:bg-gray-100">
            <Link to="/shop" className="block px-4 py-2" onClick={onClose}>Shop</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:bg-gray-100">
            <Link to="/contact" className="block px-4 py-2" onClick={onClose}>Contact</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:bg-gray-100">
            <Link to="/cart" className="block px-4 py-2" onClick={onClose}>Cart ({countItems})</Link>
          </li>
          {!isLoggedIn && (
            <li className="transition duration-300 ease-in-out hover:bg-gray-100">
              <Link to="/login" className="block px-4 py-2" onClick={onClose}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  countItems: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

const NavBar = () => {
  const { countItems } = useCart();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // Close the menu if click is outside
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const toggleMenu = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent the dropdown from closing immediately
    setShowMenu(!showMenu); // Toggle the showMenu state directly
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="flex justify-between items-center w-full h-[70px] fixed bg-white text-black shadow-sm" role="navigation">
      <Link to="/" className="pl-8 text-lg font-semibold">shopE</Link>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggleMenu} ref={menuRef}>
        <Menu />
      </div>
      {showMenu && <DropdownMenu countItems={countItems} onClose={closeMenu} />}
      <div className="pr-4 md:block hidden">
        <Link to="/" className="p-4 hover:underline underline-offset-8">Home</Link>
        <Link to="/shop" className="p-4 hover:underline underline-offset-8">Shop</Link>
        <Link to="/contact" className="p-4 hover:underline underline-offset-8">Contact</Link>
        <Link to="/cart" className="p-4 hover:underline underline-offset-8">Cart ({countItems})</Link>
      </div>
      <div className="pr-4 md:block hidden">
        <Link to="/login" className="p-4 hover:underline underline-offset-8">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;
