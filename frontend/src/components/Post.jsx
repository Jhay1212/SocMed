import {useEffect , useState} from 'react'
import axios from 'axios'
const Post = () => {
  const [post , setPost] = useState([])
  // useEffect(async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/post/')
  //     setPost(response.data)
  //   }catch (error) {
  //     console.log(error)
  //   }
  // }), [] 
  return (
    <div className='card w-1/3 mx-auto mb-3 p-4'>
        <h2>User</h2>
        <div className="card-title">Title</div>
        <div className="card-body"><p className='card-text'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, incidunt
            ! Nam aliquid soluta maiores neque natus molestias cumque temporibus nulla.</p></div>
        <div className="card-footer">{new Date().toDateString()}</div>

    </div>
  )
}

export default Post