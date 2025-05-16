import {useEffect , useState} from 'react'
import axios from 'axios'
const Post = ({user, title, content, date_created, date_updated}) => {
  
  return (
    <div className='card w-ful mb-3 p-4 border border-white/30 backdrop-blur-2xl'>
        <h2>{user}</h2>
        <div className="card-title">{title}</div>
        <div className="card-body">
          <p className='card-text'>
            {content}
          </p>
          
          </div>
        <div className="card-footer">
          <p className='text-neutral-400'>
          {new Date(date_created).toDateString().split("T")}
          </p>
      </div>
    </div>
  )
}

export default Post