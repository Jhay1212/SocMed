import { useState, useEffect, useContext, use } from 'react'
import { UserContext } from '../App'
import burger from '../assets/burger-menu.svg'
import home from '../assets/home.svg';
import { Link } from 'react-router-dom';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { FaRocketchat } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
import Exit from '../assets/exit.svg';
const VerticalNav = ({ onSearchClick }) => {
  const user = useContext(UserContext)
  console.log(user)

  return (
    <section className='bg-[#384a54] text-white backgrop-brightness-50 h-screen 
    md:w-[16vw]  transistion transistion-all ease-in-out 
    fixed flex flex-col justify-between text-mono'>
      <ul className='list-none font-bolder text-2xl mt-10 uppercase'>
        {localStorage.getItem('username') && (

          <li className='nav_item flex items-center justify-around '>
            <img src={burger} className='h-10 w-10' alt="menu" />
            <Link className='uppercase nav_link' to='/'>{localStorage.getItem('username')}</Link>
          </li>
        )}

        <li className='nav_item flex items-center justify-around  md: w-full'>
          <IoHomeOutline className='block h-5 w-5' alt="Home Button" aria-label='Home' />
          <Link className='nav_link' to={'/'}>Home </Link></li>

        <li className='nav_item flex items-center justify-around '>
          <HiMagnifyingGlass className='block h-5 w-5' alt="" srcset="" />
          <button type='block' className='button nav_link' onClick={onSearchClick}>
            Search
          </button>
        </li>

        <li className="nav_item flex items-center justify-around">
          <FaRocketchat className='block h-5 w-5' alt="" srcset="" />
          <Link className='nav_link' to={'/chats'}>Chat</Link>
        </li>
        <li className="nav_item flex items-center justify-around">
          <MdOutlineGroups className='block h-5 w-5' alt="" srcset="" />
          <Link className='nav_link' to={'/communty'}>Group</Link>
        </li>

        <li className="nav_item flex items-center justify-around">
<img src={Exit} alt="" srcset="" className='block h-5 w-5'/>
          <Link to='/logout' className='nav_link'>Logout</Link>
        </li>
      </ul>
    </section>
  )
}

export default VerticalNav