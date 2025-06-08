import { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import VerticalNav from '../components/VerticalNav';
import XNav from '../components/XNav';
const Profile = () => {
  const {username} = useParams();
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/`, {params: {username: username}})
        setPost(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
  <main className='max-w-7xl h-screen'>
    <XNav />
    <VerticalNav />
    <div className="h-1/5 w-2/3 mx-auto border "></div>

  </main>
  )
}

export default Profile