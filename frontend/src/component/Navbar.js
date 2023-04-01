import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-3 px-8 flex flex-row justify-between items-center sticky top-0">
      {/* logo */}
      <div className="">
        <h1 className="font-bold text-white text-3xl">BlogSite</h1>
      </div>
      {/* nav items */}
      <div className="">
        <ul className="flex flex-row justify-between items-center text-xl text-white">
          <li className="ml-10">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="ml-10">
            <Link to={"/"}>Contact</Link>
          </li>
          <li className="ml-10">
            <Link to={"/"}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
