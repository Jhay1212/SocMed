import {useEffect , useState} from 'react'
import axios from 'axios'
const Post = ({user, title, content, date_created, date_updated}) => {
  
  return (
    <div className='card w-1/3 mx-auto mb-3 p-4'>
        <h2>{user}</h2>
        <div className="card-title">{title}</div>
        <div className="card-body">
          <p className='card-text'>
            {content}
          </p>
          
          </div>
        <div className="card-footer">{date_created}</div>

    </div>
  )
}

export default Post