import {useState, useEffect} from 'react'
import VerticalNav from './components/VerticalNav'
import Post from './components/Post'
import Trending from './components/Trending'
import XNav from './components/XNav'
import Searchbar from './components/Searchbar'
import {motion} from 'framer-motion'
import upload from './assets/upload-logo.svg'
import axios from 'axios'
const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [postData, setPostData ] = useState({
    title: '',
    content: '',
    media: ''

  });



  const toggleSearchModal = () => {
    setIsSearchOpen((prev) => !prev);
  }

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
      <div className={"absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 {isSearchOpen ? 'block' : 'hidden'}"}>

      <Searchbar />
      </div>
      <div className="block md:hidden ">
        <XNav onSearchClick={toggleSearchModal}/>
      </div>
      <div className="flex  justify-between">
        <nav className="md:block relative top-0 left-0">
          <div className="md:block hidden">

          <VerticalNav  onSearchClick={toggleSearchModal}/>
          </div>
        </nav>

        <main className='flex flex-col justify-evenly'>
          <div className="w-full px-4 py-6 flex justify-center">
  <form
    className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-white/20 backdrop-blur-md"
    onSubmit={handleSubmit}
  >
    <div className="mb-4">
      <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={handleChange}
        placeholder="Enter title"
        className="w-full px-4 py-2 text-gray-900 dark:text-white text-sm rounded-lg bg-gray-100
         dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Title"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="content" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
        Content
      </label>
      <input
        type="text"
        name="content"
        id="content"
        onChange={handleChange}
        placeholder="Enter content"
        className="w-full px-4 py-2 text-gray-900 dark:text-white text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Content"
        required
      />
    </div>
    <input type='file' accept='png/jpg/gif/jpeg' onChange={handleChange} name='media'/>

    <img src={upload} alt="upload"  className='h-10 w-10 '/>

    <button
      type="submit"
      className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
    >
      Submit
    </button>
  </form>
</div>


        {post.map((post, index) => (
         
            <Post key={index} 
            user={post.user}
             title={post.title} content={post.content} 
             date_created={post.date_created} 
             media={post.media}
             profile={post.profile}
             />
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