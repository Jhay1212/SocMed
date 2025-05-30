import {useState, useEffect, useContext} from 'react'
import {UserContext} from '../App'
import burger from '../assets/burger-menu.svg'
import home from '../assets/home.svg';
import search from '../assets/search.svg';
import { Link } from 'react-router-dom';
const VerticalNav = ({onSearchClick}) => {
  const user = useContext(UserContext)

  console.log(user)
  
  
  return (
    <section className='bg-[#384a54] text-white backgrop-brightness-50 h-screen 
    md:w-[16vw] 
     transistion transistion-all ease-in-out fixed flex flex-col justify-between text-mono'>
        <ul className='list-none font-bolder text-2xl mt-10 uppercase'>
              <li className='nav_item flex-center '>
              <img src={burger} className='h-6 w-6' alt="menu" />
              <Link className='uppercase nav_link' to='/'>{localStorage.getItem('username')}</Link>
              </li>

            <li className='nav_item flex-center  md: w-full'>
              <img src={home} className='h-6 w-6' alt="home" />
              <Link className='nav_link' to={'/'}>Home {user.name}</Link></li>
            <li className='nav_item flex-center '>
              <img src={search} className="block h-5 w-5" alt="" srcset="" />
              <button type='block' className='button nav_link' onClick={onSearchClick}>
              Search
              </button>
              </li>
               <li className="nav_item flex-center "><img src={search} className='h-5 w-5' alt="" srcset="" /><a href='#'  className='nav_link'>Profile</a></li>
            <li className="nav_item"><a href='#'  className='nav_link'>Community</a></li>
            <li className="nav_item"><a href='#'  className='nav_link'>Logout</a></li>


</ul>

        <ul className='list-none mb-5 font-bolder text-xl'>
            <li className="nav_item"><a href='#'  className='nav_link'>Profile</a></li>
            <li className="nav_item"><a href='#'  className='nav_link'>Settings</a></li>
            <li className="nav_item"><a href='#'  className='nav_link'>Logout</a></li>


            
        </ul>


    </section>
  )
}

export default VerticalNav