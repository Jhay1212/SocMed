import {useState, useEffect} from 'react'
import burger from '../assets/burger-menu.svg'
import home from '../assets/home.svg';
import search from '../assets/search.svg';
const VerticalNav = () => {
  const [isOpen , setIsOpen] = useState(false)
  const handleHide = () => setIsOpen(!isOpen)
  
  return (
    <section className='bg-gray-800 text-white backgrop-brightness-50 h-screen 
    md:w-[16vw] 
     transistion transistion-all ease-in-out fixed flex flex-col justify-between text-mono'>
        <ul className='list-none font-bolder text-2xl'>
          <li className='nav_item sm:hidden'><button onClick={handleHide} className='sm:inline-block ml-auto outline-none inset-0 md:hidden nav_link '>
            
            <img src={burger} alt="burger" className='h-5 w-4' /></button></li>

            <li className='nav_item flex-center gap-4 md:gap-2 w-full'>
              <img src={home} className='h-5 w-5' alt="home" />
              <a href='#'  className='nav_link'>
              HOME</a></li>
            <li className='nav_item flex-center gap-4'>
              <img src={search} className="h-5 w-5" alt="" srcset="" />
              <a href='#'  className='nav_link'>SEARCH</a></li>
            <li className='nav_item'><a href='#'  className='nav_link'>adsasdad</a></li>
            <li className='nav_item'><a href='#'  className='nav_link'>adsasdad</a></li>

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