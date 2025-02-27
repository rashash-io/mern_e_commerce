//Importing Icons
import { ShoppingCart, Lock, LogOut, LogIn, UserPlus } from "lucide-react";

import { Link } from "react-router-dom";
import { SearchProduct } from "./../../components";
import { useUserStore, useCartStore } from "../../stores";

export const DesktopNav = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  return (
    <nav className="items-center gap-4 hidden md:flex flex-wrap ">

      
      {/*-------- HOME BUTTON --------*/}
      <Link
        to="/"
        className="text-gray-300 hover:text-emerald-400 transiton duration-300 ease-in-out"
      >
        Home
      </Link>

      {/*-------- SEARCH BAR --------*/}
      <SearchProduct />

      {/*-------- CART BUTTON --------*/}
      {user && (
        <Link
          to={"/cart"}
          className="relative group text-gray-300 hover:text-emerald-400 transiton duration-300 ease-in-out"
        >
          <ShoppingCart
            className="inline-block mr-1 group-hover:text-emerald-400"
            size={20}
          />
          <span className="hidden sm:inline">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
              {cart.length}
            </span>
          )}
        </Link>
      )}

      {/*-------- LOGIN / LOGOUT / REGISTER --------*/}
      {user ? (
        <>
          {/*-------- ADMIN DASHBOARD BUTTON --------*/}
          {isAdmin && (
            <Link
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-md font-medium
                      transition duration-300 ease-in-out flex items-center"
              to={"/secret-dashboard"}
            >
              <Lock className="inline-block mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                rounded-md flex items-center transition duration-300 ease-in-out"
            onClick={logout}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline ml-2">Log Out</span>
          </button>{" "}
        </>
      ) : (
        <>
          <Link
            to={"/signup"}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
                      rounded-md flex items-center transition duration-300 ease-in-out"
          >
            <UserPlus className="mr-2" size={18} />
            Sign Up
          </Link>
          <Link
            to={"/login"}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                      rounded-md flex items-center transition duration-300 ease-in-out"
          >
            <LogIn className="mr-2" size={18} />
            Login
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopNav;
