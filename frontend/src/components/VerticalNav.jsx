import React from 'react'

const VerticalNav = () => {
  return (
    <section className='bg-white h-screen w-[12vw] sm:none transistion transistion-all ease-in-out fixed flex flex-col justify-between text-mono'>
        <ul className='list-none font-bolder text-2xl'>
            <li className='nav_link'><a href='#'  className='nav_item'>adsasdad</a></li>
            <li className='nav_link'><a href='#'  className='nav_item'>adsasdad</a></li>
            <li className='nav_link'><a href='#'  className='nav_item'>adsasdad</a></li>
            <li className='nav_link'><a href='#'  className='nav_item'>adsasdad</a></li>

</ul>

        <ul className='list-none mb-5 font-bolder text-xl'>
            <li className="nav_link">Profile</li>
            <li className="nav_link">Account Settings</li>
            <li className="nav_link">Logout</li>


            
        </ul>


    </section>
  )
}

export default VerticalNav