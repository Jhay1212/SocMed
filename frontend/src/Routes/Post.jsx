import {useState, useEffect} from 'react'

const Post = () => {
    const [post, setPost] = useState([]);
    const {id} = parseInt(useParams());
  return (
    <div>Post</div>
  )
}

export default Post