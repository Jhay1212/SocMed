import React from 'react'

const Trending = () => {
  return (
    <div className='fixed top-[50%] left-[75%] card w-/4 mx-auto mb-3 p-4 transform -translate-y-1/2'>
        <div className="flex flex-col items-center border border-black">
            <div className="card-title">Trending</div>
            <ul>
                <li>Trending 1</li>
                <li>Trending 2</li>
                <li>Trending 3</li>
            </ul>
        </div>
    </div>
  )
}

export default Trending