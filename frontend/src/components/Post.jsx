import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";


const Post = ({ user, title, content, date_created, media, profile }) => {
  return (
    <div className="card w-[80%] md:w-full mx-auto p-6 mb-4 border h-[85%] border-white/20 bg-gray-800 text-white rounded-lg shadow-lg max-w-2xl">
     
     <div className="flex justify-between mb-2  border-red-800">
      
      <div className="flex items-center gap-3 mb-4"> 
        <img 
          src={profile} 
          alt={`${user}'s profile`} 
          className="h-20 w-20 rounded-full object-cover border border-white/30"
          />
        <h2 className="text-xl font-bold">{user}</h2>
      </div>
      <GoPencil />
          </div>

      <h3 className="text-2xl font-bold mb-2">{title}</h3>

      <div className="mb-4">
        <p className="text-gray-300">{content}</p>
      </div>

      {media && (
        <div className="mb-4">
          <img 
            src={media.startsWith('http') ? media : `http://localhost:8000/${media}`} 
            alt="Post media" 
            className="w-full rounded-lg "
          />
        </div>
      )}

      <div className="text-sm self-end text-gray-400">
        Posted on: {new Date(date_created).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Post;
