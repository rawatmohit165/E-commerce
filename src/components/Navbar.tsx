import { FaShoppingCart } from "react-icons/fa";
import type { NavbarProps } from "../types";
const Navbar = (props: NavbarProps) => {

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow lg:max-w-7xl lg:mx-auto">
        <div className="flex flex-row justify-between items-center py-4 ">
          <div className="flex items-center gap-2 pl-5 " onClick={() => props.setPage("home")}>
            <p className="md:text-[26px] lg:text-3xl ">🛍️</p>
            <p className="md:text-[20px] lg:text-2xl" >ShopEase</p>
          </div>
          <div className="flex flex-row pr-2 gap-4 mr-2">
            <button className="bg-[#DBEAFE] border rounded-xl md:rounded-lg lg:rounded-xl  text-[#2563EB] text-sm py-1 px-2 md:text-xl md:px-1 md:py-2 lg:px-3   lg:py-0.5 " onClick={() => props.setPage("home")}>
              Home
            </button>
            <button  className="flex relative flex-row justify-center items-center border rounded-lg   px-2 gap-2 py-1 bg-[#2563EB] text-[20px] md:px-4 md:py-1 lg:px-5 lg:py-0.5" onClick={() => props.setPage("cart")}>
              <FaShoppingCart className="text-white text-sm lg:text-2xl md:text-xl"/>
              <div className="h-4 w-4  text-sm absolute -top-1.5 -right-1.5 bg-yellow-400 flex text-white justify-center items-center rounded-full md:h-6 md:w-6 md:-top-2 md:-right-3 lg:h-6 lg:w-6 lg:text-sm  lg:-top-3 lg:-right-3  "> {props.totalItems > 10 ? "10+" : props.totalItems}</div>
              <p className="text-white text-sm md:text-xl lg:text-2xl" >Cart</p>
            </button> 
          </div>

        </div>
    </nav>
  );
};

export default Navbar;