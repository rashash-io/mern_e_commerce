//Importing Icons
import { ShoppingCart, Lock ,LogOut, LogIn, UserPlus} from "lucide-react";
//React router
import { Link } from "react-router";
import {useUserStore, useCartStore} from "../stores";

export const Navbar = () => {
  const{ user,logout} = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  return (
    <div className="relative z-50 pt-20">

    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          {/*-------- ICON / LOGO --------*/}
          <Link
            to={"/"}
            className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex flex-col"
          >
            RA$HASH
            <span className="text-white/50 text-sm font-light">
              (Garage Store)
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            {/*-------- HOME BUTTON --------*/}
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 transiton duration-300 ease-in-out"
            >
              Home
            </Link>

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
                {cart.length > 0 &&(


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
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
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
        </div>
      </div>
    </header>
    </div>
  );
};

export default Navbar;
