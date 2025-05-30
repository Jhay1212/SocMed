import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './Routes/Authentication/Register.jsx'
import Post from './components/Post.jsx'
import Profile from './Routes/Profile.jsx'
import Login from './Routes/Authentication/Login.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'profile/:username',
    element: <Profile />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'signup',
    element: <Register />,
  },
{
  path: 'login',
  element: <Login />,
},

  {
    path: 'post/:id',
    element: <Post />,
  },
  {
    path: 'post/:title/edit',
    element: <Post />,
  }


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
