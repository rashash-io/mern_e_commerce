import {Menu, X} from 'lucide-react'
import { useState } from 'react';
import SearchProduct from './SearchProduct';


export const MobileNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <div>
      <div className="drawer drawer-end md:hidden flex ">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          onChange={() => setDrawerOpen(!drawerOpen)}
        />
        <div className="drawer-content z-50">
          {/* Page content here */}

          {/* <Menu /> */}
          <label
            htmlFor="my-drawer"
            className=" hover:cursor-pointer drawer-button relative"
          >
            <div className="flex p-2 rounded-full bg-gray-950">
              <X
                className={`h-10 w-10 absolute  transition-all duration-500 text-emerald-500 ${
                  !drawerOpen && " opacity-0"
                } `}
              />
              <Menu
                className={`h-10 w-10 transition-all duration-500 text-emerald-500  ${
                  drawerOpen && "opacity-0"
                }`}
              />
            </div>

            {/* this hidden checkbox controls the state */}
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-gray-950 text-base-content min-h-full w-80  border border-emerald-500  ">
            {/* Sidebar content here */}
            <div className="flex items-center justify-center  w-[85%]">
              <span className=" mt-6 mb-3 items-center text-lg font-bold text-emerald-500 ">
                RA$HASH.IO Store
              </span>
              
            </div>
            <div >
              <SearchProduct />
           
            </div>
            <li>
              <a className=" ">Home</a>
            </li>
            <li>
              <a className="">Dashboard</a>
            </li>
            <li>
              <a className="">Logout</a>
            </li>
            <li>
              <a className="">Login</a>
            </li>
            <li>
              <a className="">Cart</a>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileNav