import React from 'react'
import VerticalNav from './components/VerticalNav'
import Post from './components/Post'
import Trending from './components/Trending'
const App = () => {
  return (

    <>
    <main className='bg-neutral-400 h-screen w-screen sm:none transistion transistion-all ease-in-out text-mono'>
    <div className='grid grid-row-3 *:bg-red'>  

      <VerticalNav />
       <section className='col-span-2'>
        <form className='w-1/3 mx-auto mb-3 p-4 bg-white'>
        <textarea className='w-full bg-green-300 h-20 border-2  border-black rounded-lg' placeholder='What are you thinking about?'></textarea>
        
        <div className="flex justify-between items-center">
        <div id="media" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            <input type="file" className='hidden' id="media" />
        </div>
        <div className='flex justify-end items-center gap-2'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Post</button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Save</button>
            </div>
        </div>
        </form>
        <Post />
       </section>
       <section className='col-span-2'>
        <Trending />
       </section>
    </div>

    </main>
    </>
  )
}

export default App