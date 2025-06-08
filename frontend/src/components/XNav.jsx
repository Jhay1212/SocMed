import React from 'react';
import homeIcon from '../assets/home.svg';
import searchIcon from '../assets/search.svg';
import HomeI from '../assets/home-white2.svg';
import { Link } from 'react-router-dom';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdExitToApp } from "react-icons/md";
import Exit from '../assets/exit.svg'
const XNav = ({ onSearchClick }) => {

  return (


    <header className="w-full h-20 bg-[#384a54] shadow-md">

      <nav className="max-w-screen-xl mx-auto h-full flex items-center justify-around px-4">
        <ul className="flex w-full justify-between items-center">

          <li className="flex-1 text-center">
            <button type='button' onClick={onSearchClick}>
              <img src={searchIcon} alt="Search" className="h-8 mx-auto hover:scale-110 transition-transform" />
            </button>
          </li>
          <li className="flex-1 text-center">
            <Link to="/">
              <img src={HomeI} alt="Home" className="h-8 mx-auto hover:scale-110 transition-transform" />
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link to="/logout">
              <img src={Exit} alt="Logout" className="h-8 mx-auto hover:scale-110 transition-transform" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default XNav;
