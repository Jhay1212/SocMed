import React from 'react'

const Trending = () => {
  return (
    <div className="fixed top-1/2 left-[75%] w-1/4 transform -translate-y-1/2">
      <div className="bg-[#384a53] text-white rounded-2xl shadow-lg p-6 border border-[#1e2a3a]">
        <h2 className="text-xl font-semibold text-center mb-4">Trending</h2>
        <ul className="space-y-2">
          <li className="bg-[#1e2a3a] p-2 rounded-lg hover:bg-[#2a3b4f] transition">Trending 1</li>
          <li className="bg-[#1e2a3a] p-2 rounded-lg hover:bg-[#2a3b4f] transition">Trending 2</li>
          <li className="bg-[#1e2a3a] p-2 rounded-lg hover:bg-[#2a3b4f] transition">Trending 3</li>
        </ul>
      </div>
    </div>
  )
}

export default Trending
