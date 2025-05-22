import { useState, useEffect} from 'react'
import axios from 'axios'
const Profile = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/')
        setPost(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
  <main className='max-w-7xl h-screen'>
    <div className="h-1/5 w-2/3 mx-auto border "></div>

  </main>
  )
}

export default Profile