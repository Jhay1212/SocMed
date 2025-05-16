import React from 'react'
import home from '../assets/home.svg'
import search from '../assets/search.svg'
import { Link } from 'react-router-dom'

const XNav = () => {
  return (
    <header className='max-w-screen h-1/6'>
        <div className="bg flex-center mb-2 w-full bg-red-700">
            <ul className='flex flex-row justify-between items-center h-full w-full'>
                <li className='block w-[300px]'><Link to={'/'}><img src={home} alt="home" className='' /></Link></li>
                <li className='block w-[300px]'><Link to={'/'}><img src={home} alt="search"  /></Link></li>
                <li className='block w-[300px]'><Link to={'/'}><img src={home} alt="search" /></Link></li>
            </ul>
        </div>

    </header>
  )
}

export default XNav