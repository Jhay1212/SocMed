import {useState, useEffect} from 'react'
import VerticalNav from './components/VerticalNav'
import Post from './components/Post'
import Trending from './components/Trending'
import {motion} from 'framer-motion'
import axios from 'axios'
const App = () => {
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
  fetchPosts()
}, [])
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get('http://localhost:8000/api/posts/')
      setPost(response.data)
    }catch (error) {
      console.log(error)
    }
  }
  console.log(post)
  return (
    <>
    <main className='bg-neutral-400 h-screen w-screen gap-5 sm:none transistion transistion-all ease-in-out text-mono'>
    <div className='grid grid-row-3 gap-2'>  

      <nav>
      <VerticalNav />
      </nav>
       <section className='col-span-2 sm:span-3 border border-black'>
        <form className='sm:w-[300px] md:w-1/2 lg:max-w-xl  mx-auto mb-3 p-4 ' onSubmit={handleSubmit}>
        <div className='w-3/4 bg-white rounded-lg mx-auto mb-4 p-4'>
        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900
         bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
         placeholder="Write your thoughts here..."></textarea>
        
        <div className='flex'>
            <motion.button whileHover={{scale: 1.1}} 
            className='btn btn-primary mx-auto'
            type='button'
            >Post</motion.button>
         </div>
          </div> 
        </form>
        {
          post.length > 0 ? post.map((p, index) => <Post key={index} user= {p.user} content={p.content} title={p.title} 
          date_created={p.date_created} date_updated={p.date_updated} />) : 'No post'
        }

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