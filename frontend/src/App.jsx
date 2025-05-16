import {useState, useEffect} from 'react'
import VerticalNav from './components/VerticalNav'
import Post from './components/Post'
import Trending from './components/Trending'
import XNav from './components/XNav'
import {motion} from 'framer-motion'
import axios from 'axios'
const App = () => {
  const [post, setPost] = useState([]);
  const [postData, setPostData ] = useState({
    title: '',
    content: ''

  });




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
 

const handleChange = (e) => {
  setPostData({
    ...postData,
    [e.target.name]: e.target.value
  })
}
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/posts/')
      setPost(response.data)
    }catch (error) {
      console.log(error)
    }
  }
  console.log(post)
  return (
    <div className='w-screen h-screen'>
      <div className="block md:hidden ">
        <XNav />
      </div>
      <div className="flex  justify-between">
        <nav className="md:block relative top-0 left-0">
          <div className="md:block hidden">

          <VerticalNav />
          </div>
        </nav>

        <main className='flex flex-col justify-evenly'>
          <div className="w-full border border-white/30 backrop-blur-lg"></div>
          <form className='w- mx-auto mb-3 p-4 ' onSubmit={handleSubmit}>
            <div className='w-full md:w-1/2 bg-white rounded-lg mx-auto mb-4 p-4'>
              <input type="text" name="title" onChange={handleChange} placeholder="Enter title" id=""
                className='block p-2.5 text-white w-full text-sm mb-3
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 ' />
              <input type="text" name="content" onChange={handleChange} placeholder="Enter content" id=""
                className='block p-2.5 text-white w-full text-sm mb-3
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 ' />
              <button type="submit" className='btn'>Submit</button>
            </div>
          </form>

        {post.map((post, index) => (
          <div className="card container border border-white backdrop-blur-lg shadow-md">
            <Post key={index} 
            user={post.user}
             title={post.title} content={post.content} 
             date_created={post.date_created} 
             date_updated={post.date_updated} />

          </div>
          
        ))}

        </main>

        <section>
          <Trending />
        </section>
      </div>

      </div>
    // <>
    // {/* <main className='bg-neutral-400 h-screen w-screen gap-5 gap-t-0 sm:none transistion transistion-all ease-in-out text-mono'>
    // <div className='grid grid-row-3 gap-2'>  

    //   <nav>
    //   <VerticalNav />
    //   </nav>

    //    <section className='col-span-2 sm:span-3 border border-black'>
    //     <form className='w-300px md:w-1/2 lg:max-w-xl  mx-auto mb-3 p-4 ' onSubmit={handleSubmit}>
    //     <div className='w-3/4 md:w-1/2 bg-white rounded-lg mx-auto mb-4 p-4'>
    //     <input type="text" name="title" onChange={handleChange} placeholder="Enter title" id=""
    //      className='block p-2.5 text-white w-full text-sm mb-3
    //      bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 ' />
    //     <textarea id="message" rows="4" name='content' onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900
    //      bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
    //      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    //      placeholder="Write your thoughts here..."></textarea>
        
    //     <div className='flex'>
    //         <motion.button whileHover={{scale: 1.1}} 
    //         className='btn btn-primary mx-auto'
    //         type='button'
    //         >Post</motion.button>
    //      </div>
    //       </div> 
    //     </form>

    //     {
    //       post.length > 0 ? post.map((p, index) =>
    //          <Post key={index} user= {p.user} content={p.content} title={p.title} 
    //       date_created={new Date(p.date_created).toDateString().split('T')} date_updated={new Date(p.date_updated).toDateString().split(' ').slice(1).join('T')} />) : 'No post'
    //     }

    //    </section>
    //    <section className='col-span-2'>
    //     <Trending />
    //    </section>
    // </div>

    // </main> */}
    // </>
  )
}

export default App