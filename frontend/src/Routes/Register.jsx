import {useState, useEffect} from 'react'
import axios from 'axios'
const Register = () => {
  return (
    <main className='max-w-7xl h-screen'>
        <div className="wrapper flex-center">
            <div className="card border text-center border-white rounded-lg">
                <h1 className='text-2xl  sm:text-xl *:font-bold'>Register</h1>
                <form action="" className='flex flex-col gap-2' method="post">
                    <input type="text" className='input' placeholder='Username' />
                    <input type="password" className='input' placeholder='Password' />
                    <input type="password" className='input' placeholder='Confirm Password' />
                    <button className='btn'>Register</button>
                        </form>
            </div>
        </div>
    </main>
  )
}

export default Register