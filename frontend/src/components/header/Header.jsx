//Importing Icons

import { Link } from "react-router";

import { DesktopNav } from "..";
import MobileNav from "./MobileNav";

export const Header = () => {
  return (
    <div className="relative z-50 pt-20">
      <header className="fixed top-0 left-0 w-full bg-gray-900/70 bg-opacity-50 backdrop-blur-md shadow-lg z-40 transition all duration-300 border-b-3 border-emerald-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex  flex-wrap justify-between items-center ">
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
            <MobileNav />
            <DesktopNav />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
