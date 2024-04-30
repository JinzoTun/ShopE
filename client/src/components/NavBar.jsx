import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import {useCart} from "../context/useCart";



const NavBar = () => {

  const { countItems } = useCart(); 



  return (
    <nav className="flex justify-between items-center w-full h-[70px] fixed bg-white text-black shadow-sm" role="navigation">
      <Link to="/" className="pl-8 text-lg font-semibold">shopE</Link>
      <div className="px-4 cursor-pointer md:hidden">
        <Menu />
      </div>
      <div className="pr-4 md:block hidden">
        <Link to="/" className="p-4 hover:underline underline-offset-8">Home</Link>
        <Link to="/shop" className="p-4 hover:underline underline-offset-8">Shop</Link>
        <Link to="/contact" className="p-4 hover:underline underline-offset-8">Contact</Link>
        <Link to="/cart" className="p-4 hover:underline underline-offset-8">Cart({countItems})</Link> {/* Display countItems in the Cart link */}
      </div>
    </nav>
  );
};

export default NavBar;
