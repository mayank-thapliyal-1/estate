import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const{currentUser} = useSelector(state=>state.user)
  return (
    <nav className=" shadow-md bg-slate-200">
      <div className=" flex justify-between items-center p-3 max-w-6xl m-auto">
        <Link to="/">
          <h1 className=" font-semibold text-xl sm:text-2xl flex-wrap">
            <span className=" text-slate-700">Ghar</span>
            <span className=" text-slate-900">Sansar</span>
          </h1>
        </Link>
        <form
          action=""
          className=" bg-slate-100 p-3 rounded-md flex items-center"
        >
          <input
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search"
          />
          <FaSearch className=" text-slate-600 cursor-pointer" />
        </form>

        <ul className="flex gap-5  text-slate-700">
          <Link to="/">
            {" "}
            <li className="hidden sm:inline hover:underline px-3 cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
            {" "}
            <li className=" hidden sm:inline hover:underline px-3 cursor-pointer">About</li>
          </Link>
          <Link to="/profile">
       { currentUser ?(<img className=" h-7 rounded-full" src={currentUser.avatar} alt='profile'/>):
        (<li className="sm:inline hover:underline px-3 cursor-pointer">Sign In</li>)}
    
         </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
