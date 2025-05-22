import React from 'react';
import homeIcon from '../assets/home.svg';
import searchIcon from '../assets/search.svg';
import { Link } from 'react-router-dom';


const XNav = ({onSearchClick}) => {

  return (


    <header className="w-full h-20 bg-red-700 shadow-md">

      <nav className="max-w-screen-xl mx-auto h-full flex items-center justify-around px-4">
        <ul className="flex w-full justify-between items-center">
          <li className="flex-1 text-center">
            <Link to="/">
              <img src={homeIcon} alt="Home" className="h-8 mx-auto hover:scale-110 transition-transform" />
            </Link>
          </li>
          <li className="flex-1 text-center">
            <button type='button' onClick={onSearchClick}>
              <img src={searchIcon} alt="Search" className="h-8 mx-auto hover:scale-110 transition-transform" />
            </button>
          </li>
          <li className="flex-1 text-center">
            <Link to="/profile">
              <img src={homeIcon} alt="Profile" className="h-8 mx-auto hover:scale-110 transition-transform" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default XNav;
