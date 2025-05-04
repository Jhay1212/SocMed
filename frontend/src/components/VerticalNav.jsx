import React from 'react'

const VerticalNav = () => {
  return (
    <section className='bg-white h-screen w-[16vw] sm:none transistion transistion-all ease-in-out fixed flex flex-col justify-between text-mono'>
        <ul className='list-none font-bolder text-2xl'>
            <li className='nav_item'><a href='#'  className='nav_link'>adsasdad</a></li>
            <li className='nav_item'><a href='#'  className='nav_link'>adsasdad</a></li>
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